import { globalObj } from '../core/global';
import { unique } from './general';

/**
 * Helper function for mapping GVL data based on the disclosed vendor list.
 *
 * @param {number[] | undefined} disclosedVendorIds
 */
export const mapGvlData = (disclosedVendorIds) => {
    const gvl = globalObj._state._gvlJson;

    const vendorsToShow = disclosedVendorIds?.length ? disclosedVendorIds.filter((id) => id in gvl.vendors) : Object.keys(gvl.vendors);

    const originalPurposes = gvl.purposes;
    const originalSpecialPurposes = gvl.specialPurposes;
    const originalFeatures = gvl.features;
    const originalSpecialFeatures = gvl.specialFeatures;

    const originalStacks = gvl.stacks;
    const stacks = Object.values(gvl.stacks);
    
    const vendors = vendorsToShow.map((vendorId) => gvl.vendors[vendorId]);
    const extendedVendors = vendors.map((vendor) => {
        const mappedPurposes = vendor.purposes.map((id) => gvl.purposes[id]);
        const mappedLegIntPurposes = vendor.legIntPurposes.map((id) => gvl.purposes[id]);
        const mappedFlexiblePurposes = vendor.flexiblePurposes.map((id) => gvl.purposes[id]);
        const mappedSpecialPurposes = vendor.specialPurposes.map((id) => gvl.specialPurposes[id]);
        const mappedFeatures = vendor.features.map((id) => gvl.features[id]);
        const mappedSpecialFeatures = vendor.specialFeatures.map((id) => gvl.specialFeatures[id]);
        const mappedDataDeclaration = vendor.dataDeclaration.map((id) => gvl.dataCategories[id]);

        return {
            ...vendor,
            purposes: mappedPurposes,
            legIntPurposes: mappedLegIntPurposes,
            flexiblePurposes: mappedFlexiblePurposes,
            specialPurposes: mappedSpecialPurposes,
            features: mappedFeatures,
            specialFeatures: mappedSpecialFeatures,
            dataDeclaration: mappedDataDeclaration
        };
    });
    const vendorCount = vendorsToShow.length;

    return {
        originalPurposes,
        originalSpecialPurposes,
        originalFeatures,
        originalSpecialFeatures,
        originalStacks,
        stacks,
        vendors,
        vendorCount,
        vendorIds: vendorsToShow,
        extendedVendors
    };
};

/**
 * Helper function for generating a vendor description for showing in a consent modal.
 *
 * @returns {string}
 */
export const generateVendorDescription = () => {
    const { originalPurposes, originalSpecialFeatures, vendors } = globalObj._state._gvlData;

    let vendorSpecialFeatures = [];
    let vendorPurposes = [];
    for (const vendor of vendors) {
        vendorSpecialFeatures.push(...vendor.specialFeatures);
        vendorPurposes.push(...vendor.purposes);
        vendorPurposes.push(...vendor.legIntPurposes);
    }

    vendorSpecialFeatures = unique(vendorSpecialFeatures);
    vendorPurposes = unique(vendorPurposes);

    const vendorSpecialFeaturesText = vendorSpecialFeatures.reduce((acc, curr) => `${acc} ${originalSpecialFeatures[curr].name}.`, '');
    const vendorPurposeText = vendorPurposes.reduce((acc, curr) =>  `${acc} ${originalPurposes[curr].name}.`, '');
    
    return `${vendorSpecialFeaturesText} ${vendorPurposeText}`;
    
    // let vendorDescription = '';

    // const vendorWithPurpose1 = vendors.find((v) => v.purposes.includes(1) || v.legIntPurposes.includes(1));
    // if (vendorWithPurpose1) {
    //     vendorDescription += `${originalPurposes[1].name}.`;
    // }

    // const stacksUsed = stacks.filter((s) => {
    //     const vendorUsingStackExists = vendors.some((v) => {
    //         const hasPurposes = v.purposes.length && s.purposes.length && s.purposes.every((p) => v.purposes.includes(p));
    //         const hasSpecialFeatures = v.specialFeatures.length && s.specialFeatures.length && s.specialFeatures.every((sf) => v.specialFeatures.includes(sf));

    //         return hasPurposes || hasSpecialFeatures;
    //     });

    //     return vendorUsingStackExists;
    // });
    
    // const distinctStackNames = [...new Set(stacksUsed.map((s) => s.name))];
    // const orderedStackNames = distinctStackNames.sort((a, b) => a.length - b.length);

    // // Filter out the stack names that start with the same first two words
    // const uniqueStackNames = orderedStackNames.reduce((acc, curr) => {
    //     const splitName = curr.split(' ');
    //     const firstTwoWords = `${splitName[0]} ${splitName[1]}`;

    //     if (!acc.find((a) => a.startsWith(firstTwoWords))) {
    //         acc.push(curr);
    //     }

    //     return acc;
    // }, []);

    // const stackNamesForDescription = uniqueStackNames.slice(0, 5);
    // return stackNamesForDescription.reduce((acc, curr) => `${acc} ${curr}.`, vendorDescription);
};

/**
 * Helper function for generating preferences modal data based on the disclosed vendors for showing
 * in the preferences modal.
 */
export const generateVendorPreferenceModalData = () => {
    const {
        stacks,
        vendors,
        originalPurposes,
        originalFeatures,
        originalSpecialPurposes,
        originalSpecialFeatures
    } = globalObj._state._gvlData;

    /**
     * Helper function for creating the object with the data and data occurrence count.
     *
     * @param {number[]} ids 
     * @param {any} values
     */
    const createCountObject = (ids, values) => ids.reduce((acc, id) => {
        const occurrence = acc[id];

        if (!occurrence) {
            acc = {
                ...acc,
                [id]: {
                    data: values[id],
                    count: 1
                }
            };
        } else {
            occurrence.count++;
        }

        return acc;
    }, {});

    const vendorSpecialPurposeIds = [];
    const vendorFeatureIds = [];
    const vendorPurposeIds = [];
    const vendorSpecialFeatureIds = [];
    for (const vendor of vendors) {
        vendorSpecialPurposeIds.push(...vendor.specialPurposes);
        vendorFeatureIds.push(...vendor.features);
        vendorPurposeIds.push(...vendor.purposes);
        vendorSpecialFeatureIds.push(...vendor.specialFeatures);
    }
  
    const specialPurposes = Object.values(createCountObject(vendorSpecialPurposeIds, originalSpecialPurposes));
    const features = Object.values(createCountObject(vendorFeatureIds, originalFeatures));
    const purposes = createCountObject(vendorPurposeIds, originalPurposes);
    const specialFeatures = createCountObject(vendorSpecialFeatureIds, originalSpecialFeatures);

    let uniqueVendorPurposeIds = unique(vendorPurposeIds);
    let uniqueVendorSpecialFeatureIds = unique(vendorSpecialFeatureIds);

    const sortedStacks = stacks.sort((s1, s2) => {
        const purposesDiff = s2.purposes.length - s1.purposes.length;

        if (purposesDiff !== 0) {
            return purposesDiff;
        }

        return s2.specialFeatures.length - s1.specialFeatures.length;
    });

    let stacksToShow = [];
    for (const stack of sortedStacks) {
        const purposesUsed = stack.purposes.length && uniqueVendorPurposeIds.length && stack.purposes.every((id) => uniqueVendorPurposeIds.includes(id));
        const specialFeaturesUsed = stack.specialFeatures.length && uniqueVendorSpecialFeatureIds.length && stack.specialFeatures.every((id) => uniqueVendorSpecialFeatureIds.includes(id));
        const isStackUsed = purposesUsed || specialFeaturesUsed;

        if (isStackUsed) {
            uniqueVendorPurposeIds = uniqueVendorPurposeIds.filter((id) => !stack.purposes.includes(id));
            uniqueVendorSpecialFeatureIds = uniqueVendorSpecialFeatureIds.filter((id) => !stack.specialFeatures.includes(id));

            let stackToShow = {
                data: {
                    ...stack,
                    purposes: stack.purposes.map((pId) => purposes[pId]),
                    specialFeatures: stack.specialFeatures.map((sfId) => specialFeatures[sfId])
                },
                count: 0
            };

            for (const vendor of vendors) {
                const vendorUsesPurposes = vendor.purposes.length && stack.purposes.length && vendor.purposes.some((id) => stack.purposes.includes(id));
                const vendorUsesSpecialFeatures = vendor.specialFeatures.length && stack.specialFeatures.length && vendor.specialFeatures.some((id) => stack.specialFeatures.includes((id)));
                const isVendorUsingStack = vendorUsesPurposes || vendorUsesSpecialFeatures;

                if (isVendorUsingStack) {
                    stackToShow.count++;
                }
            }

            stacksToShow.push(stackToShow);
        }
    }

    return {
        stacksToShow,
        purposes,
        purposeIdsToShow: uniqueVendorPurposeIds,
        specialPurposes,
        features,
        specialFeatures,
        specialFeatureIdsToShow: uniqueVendorSpecialFeatureIds
    };
};