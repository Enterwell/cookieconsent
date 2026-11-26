import * as CookieConsent from "../src/index"

// A site's Google Additional Consent string.
const explicitAcString = '2~1.35~dv.9';

/**
 * Calls the TCF API and returns what it passed to the callback.
 * @param {string} command
 * @param {unknown} [parameter]
 */
const tcfapi = (command, parameter) => {
    let response;
    window.__tcfapi(command, 2, (data, success) => {
        response = { data, success };
    }, parameter);
    return response;
};

describe("TCF Additional Consent", () => {

    beforeAll(async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('offline')));

        await CookieConsent.run({
            isTcfCompliant: true,
            tcfComplianceConfig: {
                cmpId: 441,
                cmpVersion: 110,
                explicitAcString
            },
            categories: {
                necessary: {
                    enabled: true,
                    readOnly: true
                }
            },
            language: {
                default: 'en',
                translations: {
                    en: {
                        consentModal: {},
                        preferencesModal: {
                            sections: []
                        }
                    }
                }
            }
        });
    });

    it.each(['getTCData', 'getInAppTCData'])('%s carries the Additional Consent string', (command) => {
        const { data, success } = tcfapi(command);
        expect(success).toBe(true);
        expect(data.addtlConsent).toBe(explicitAcString);
    });

    // The CMP API answers a command it cannot fulfil (here an invalid vendor
    // list) with null and false. The handlers must pass that on, not set
    // addtlConsent on null.
    it.each(['getTCData', 'getInAppTCData'])('a failed %s reports null to the caller', (command) => {
        expect(() => tcfapi(command, 'not-a-vendor-list')).not.toThrow();
        expect(tcfapi(command, 'not-a-vendor-list')).toEqual({ data: null, success: false });
    });
});
