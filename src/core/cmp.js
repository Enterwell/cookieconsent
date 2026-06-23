import { CmpApi } from '@iabtechlabtcf/cmpapi';
import { TCModel, TCString, GVL } from '@iabtechlabtcf/core';

import { globalObj } from './global';
import { validConsent } from './api';
import { mapGvlData } from '../utils/gvl';
import { loadCmpApiStub } from './stub';

/**
 * @type {GVL | undefined}
 */
let gvl;

/**
 * @type {CmpApi | undefined}
 */
let cmpApi;

/**
 * @type {Promise<boolean> | undefined}
 */
let gvlPromise;

/**
 * @type {string}
 */
let gvlLanguageCode = '';

/**
 * Loads the Global Vendor List if it is needed and has not already been loaded
 * for the current language.
 *
 * @returns {Promise<boolean>}
 */
export const ensureGvlLoaded = async () => {
    const { _config, _state } = globalObj;

    if (!_config.isTcfCompliant) return true;

    const currentLanguageCode = _state._currentLanguageCode;

    if (gvl && _state._gvlData && gvlLanguageCode === currentLanguageCode) {
        return true;
    }

    if (gvlPromise) {
        return gvlPromise;
    }

    const {
        disclosedVendorIds,
        gvlBaseUrl,
        gvlDefaultFileName = 'vendor-list.json',
        gvlLanguageFileName = 'vendor-list-[LANG].json'
    } = _config.tcfComplianceConfig ?? {};

    gvlPromise = (async () => {
        try {
            // Construct the GVL file name correctly
            const fileName = currentLanguageCode === 'en' ? gvlDefaultFileName : gvlLanguageFileName.replace('[LANG]', currentLanguageCode);

            const gvlUrl = `${gvlBaseUrl}/${fileName}`;

            const gvlResponse = await fetch(gvlUrl);
            if (!gvlResponse.ok) {
                throw new Error(`${gvlResponse.status}: ${gvlResponse.statusText}`);
            }

            const gvlJson = await gvlResponse.json();

            _state._gvlJson = gvlJson;
            _state._gvlData = mapGvlData(disclosedVendorIds);

            gvl = new GVL(gvlJson);
            gvlLanguageCode = currentLanguageCode;

            return true;
        } catch (err) {
            console.error('An error occurred while loading the GVL:', err);

            return false;
        } finally {
            gvlPromise = undefined;
        }
    })();

    return gvlPromise;
};

/**
 * Configures the CMP API asynchronously.
 */
export const configCmpApi = async () => {
    const { _config, _state } = globalObj;

    // Configure the CMP API if the cookie consent should be TCF compliant
    if (!_config.isTcfCompliant) return;

    // Check if the CMP API stub was successfully loaded, if not, load it first
    if (!_state._isCmpApiStubLoaded) {
        loadCmpApiStub();
    }

    const {
        cmpId,
        cmpVersion,
        explicitAcString
    } = _config.tcfComplianceConfig ?? {};

    if (explicitAcString) {
        cmpApi = new CmpApi(cmpId, cmpVersion, true, {
            'getTCData': (next, tcData, status) => {
                /*
                * If using with 'removeEventListener' command, add a check to see if tcData is not a boolean. */
                if (typeof tcData !== 'boolean') {
                    tcData.addtlConsent = explicitAcString;
                }

                // pass data and status along
                next(tcData, status);
            },
            'getInAppTCData': (next, tcData, status) => {
                /*
                * If using with 'removeEventListener' command, add a check to see if tcData is not a boolean. */
                if (typeof tcData !== 'boolean') {
                    tcData.addtlConsent = explicitAcString;
                }

                // pass data and status along
                next(tcData, status);
            }
        });
    } else {
        cmpApi = new CmpApi(cmpId, cmpVersion, true);
    }

    _state._isCmpApiLoaded = true;

    if (validConsent()) {
        const tcString = _state._savedCookieContent.tcString;

        if (tcString) {
            cmpApi.update(tcString, false);
            return;
        }
    }

    await ensureGvlLoaded();
    updateTCString();
};

/**
 * Updates the TC string with the new cookie values.
 */
export const updateTCString = () => {
    const { _config, _state } = globalObj;

    // Update the TC string if the cookie consent should be TCF compliant
    if (!_config.isTcfCompliant) return;

    if (!cmpApi) return;

    const consentIsValid = validConsent();
    const savedTcString = _state._savedCookieContent.tcString;

    if (consentIsValid && !gvl && savedTcString) {
        cmpApi.update(savedTcString, false);

        return savedTcString;
    }

    if (!consentIsValid || !gvl) {
        cmpApi.update('', true);

        return;
    }

    const tcModel = new TCModel(gvl);
    tcModel.isServiceSpecific = true;

    const { _savedCookieContent, _gvlData } = globalObj._state;
    const tcfComplianceConfig = _config.tcfComplianceConfig;

    // Set consent data based on the content saved in the cookie
    tcModel.vendorsDisclosed.set(_gvlData.vendorIds);
    tcModel.vendorConsents.set(_savedCookieContent.vendorIds);
    tcModel.vendorLegitimateInterests.set(_savedCookieContent.vendorIds);
    tcModel.purposeConsents.set(_savedCookieContent.purposeIds);
    tcModel.purposeLegitimateInterests.set(_savedCookieContent.purposeIds);
    tcModel.specialFeatureOptins.set(_savedCookieContent.specialFeatureIds);

    // Set if the CMP uses non standard texts
    tcModel.useNonStandardTexts = false;

    // Set CMP identifiers
    tcModel.cmpId = tcfComplianceConfig.cmpId;
    tcModel.cmpVersion = tcfComplianceConfig.cmpVersion;

    // Encode TCModel to TCString and update the CMP API
    const encodedString = TCString.encode(tcModel);
    _state._savedCookieContent.tcString = encodedString;
    cmpApi.update(encodedString, false);

    return encodedString;
};
