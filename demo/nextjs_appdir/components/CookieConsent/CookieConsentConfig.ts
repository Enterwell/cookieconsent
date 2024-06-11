import type { CookieConsentConfig } from '../../../../types';

/**
 * Cookie Consent config to use in the Nextjs demo.
 */
const config: CookieConsentConfig = {
  // root: 'body',
  // autoShow: true,
  // disablePageInteraction: true,
  // hideFromBots: true,
  // mode: 'opt-in',
  // revision: 0,
  isTcfCompliant: true,
  tcfComplianceConfig: {
    disclosedVendorIds: [755, 12, 32, 416],
    cmpId: 1_500,
    cmpVersion: 1,
    gvlBaseUrl: window.location.origin
    // gvlDefaultFileName: 'vendor-list.json',
    // gvlLanguageFileName: 'vendor-list-[LANG].json'
  },

  cookie: {
    // name: 'cc_cookie',
    // domain: location.hostname,
    // path: '/',
    // sameSite: "Lax",
    // expiresAfterDays: 365
  },

  /**
   * Callback functions
   */
  onFirstConsent: ({ cookie }) => {
    console.log('onFirstConsent fired', cookie);
  },

  onConsent: ({ cookie }) => {
    console.log('onConsent fired!', cookie);
  },

  onChange: ({ changedCategories, changedServices, changedPurposeIds, changedSpecialFeatureIds, changedVendorIds }) => {
    console.log('onChange fired!', changedCategories, changedServices, changedPurposeIds, changedSpecialFeatureIds, changedVendorIds);
  },

  onModalReady: ({ modalName }) => {
    console.log('ready:', modalName);
  },

  onModalShow: ({ modalName }) => {
    console.log('visible:', modalName);
  },

  onModalHide: ({ modalName }) => {
    console.log('hidden:', modalName);
  },

  // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom left',
      equalWeightButtons: true,
      flipButtons: false
    },
    preferencesModal: {
      layout: 'box',
      equalWeightButtons: true,
      flipButtons: false
    }
  },

  categories: {
    necessary: {
      enabled: true, // this category is enabled by default
      readOnly: true // this category cannot be disabled
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^_ga/ // regex: match all cookies starting with '_ga'
          },
          {
            name: '_gid' // string: exact cookie name
          }
        ]
      },

      // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
      services: {
        ga: {
          label: 'Google Analytics',
          onAccept: () => {},
          onReject: () => {}
        },
        youtube: {
          label: 'Youtube Embed',
          onAccept: () => {},
          onReject: () => {}
        }
      }
    },
    ads: {}
  },

  language: {
    default: 'en',
    autoDetect: 'document',
    translations: {
      en: {
        consentModal: {
          title: 'We Care About Your Privacy',
          description: 'We and our partners ({{count}}) store and/or access information on a device, such as unique IDs in cookies to process personal data. You may find out more about the purposes for which we and our partners use cookies or exercise your preferences by clicking the ‘Cookie settings’ button below. You can revisit your consent choices or withdraw consent at any time by clicking the link to your cookie settings in our Cookie Policy. These choices will be signaled to our partners and will not affect browsing data.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Accept necessary',
          showPreferencesBtn: 'Cookie settings',
          footer: `
                      <a href="#path-to-impressum.html" target="_blank">Impressum</a>
                      <a href="#path-to-privacy-policy.html" target="_blank">Privacy Policy</a>
                  `
        },
        preferencesModal: {
          title: 'Manage cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Accept necessary',
          savePreferencesBtn: 'Accept current selection',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'About Your Privacy',
              description: 'We process your data for purposes such as delivering content or advertisements and measuring the delivery of such content or advertisements to extract insights about our website. We may share this information with our partners. Cookies set by us are shown first and do not contain the partners count under the category name; you may exercise your preferences in relation to first party cookies by toggling the switch for each first party cookie category below. The remaining cookies are third party cookies; you may exercise your preferences in relation to each purpose by toggling the relevant switch below or by vendor by clicking “List of IAB Vendors.” These choices will be signaled globally to our vendors participating in the Transparency and Consent Framework.'
            },
            {
              title: 'Strictly Necessary',
              description:
                'These cookies are essential for the proper functioning of the website and cannot be disabled.',

              //this field will generate a toggle linked to the 'necessary' category
              linkedCategory: 'necessary'
            },
            {
              title: 'Performance and Analytics',
              description:
                'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
              linkedCategory: 'analytics',
              cookieTable: {
                caption: 'Cookie table',
                headers: {
                  name: 'Cookie',
                  domain: 'Domain',
                  desc: 'Description'
                },
                body: [
                  {
                    name: '_ga',
                    domain: location.hostname,
                    desc: 'Description 1'
                  },
                  {
                    name: '_gid',
                    domain: location.hostname,
                    desc: 'Description 2'
                  }
                ]
              }
            },
            {
              title: 'Targeting and Advertising',
              description:
                'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
              linkedCategory: 'ads'
            },
            {
              title: 'More information',
              description:
                'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
            }
          ]
        }
      },
      hr: {
        consentModal: {
          title: 'Mi Poštujemo Vašu Privatnost',
          description: 'Mi i naši partneri ({{count}}) pohranjujemo i/ili pristupamo informacijama na uređaju, kao što su jedinstveni ID-ovi u kolačićima za obradu osobnih podataka. Možete saznati više o svrhama u koje mi i naši partneri koristimo kolačiće ili iskoristiti svoje postavke klikom na gumb "Postavke kolačića" u nastavku. Možete ponovno pregledati svoje odabire pristanka ili povući pristanak u bilo kojem trenutku klikom na poveznicu na svoje postavke kolačića u našim Pravilima o kolačićima. Ovi izbori bit će signalizirani našim partnerima i neće utjecati na podatke o pregledavanju.',
          acceptAllBtn: 'Prihvaćam sve',
          acceptNecessaryBtn: 'Prihvaćam samo nužne',
          showPreferencesBtn: 'Postavke kolačića',
          showVendorsBtn: 'Popis partnera (dobavljača)',
          vendorTitle: 'Mi i naši partneri obavljamo sljedeće na temelju vaših postavki',
          footer: `
                      <a href="#path-to-impressum.html" target="_blank">Impressum</a>
                      <a href="#path-to-privacy-policy.html" target="_blank">Pravila privatnosti</a>
                  `
        },
        preferencesModal: {
          title: 'Upravljaj postavkama kolačića',
          acceptAllBtn: 'Prihvaćam sve',
          acceptNecessaryBtn: 'Prihvaćam samo nužne',
          savePreferencesBtn: 'Spremi postavke',
          closeIconLabel: 'Zatvori modal',
          serviceCounterLabel: 'Servis|Servisa',
          illustrationsTitle: 'Primjeri',
          purposeVendorCountLabel: '{{count}} partnera može koristiti ovu svrhu',
          viewIllustrationsLabel: 'Pogledajte primjere',
          viewVendorsLabel: 'Popis IAB dobavljača',
          sections: [
            {
              title: 'O Vašoj Privatnosti',
              description: 'Vaše podatke obrađujemo u svrhe kao što je isporuka sadržaja ili reklama i mjerenje isporuke takvog sadržaja ili reklama kako bismo dobili uvide o našoj web stranici. Ove informacije možemo podijeliti s našim partnerima. Kolačići koje smo mi postavili prikazuju se prvi i ne sadrže broj partnera pod nazivom kategorije; možete iskoristiti svoje postavke u vezi s kolačićima prve strane prebacivanjem prekidača za svaku kategoriju kolačića prve strane u nastavku. Preostali kolačići su kolačići treće strane; možete iskoristiti svoje preferencije u odnosu na svaku svrhu prebacivanjem odgovarajućeg prekidača u nastavku ili prema dobavljaču klikom na "Popis IAB dobavljača". Ovi izbori bit će signalizirani globalno našim dobavljačima koji sudjeluju u Okviru za transparentnost i pristanak (TCF).'
            },
            {
              title: 'Nužni',
              description: 'Ovi su kolačići neophodni za pravilno funkcioniranje web stranice i ne mogu se onemogućiti.',
              //this field will generate a toggle linked to the 'necessary' category
              linkedCategory: 'necessary'
            },
            {
              title: 'Izvedba i analitika',
              description: 'Ovi kolačići prikupljaju informacije o tome kako koristite našu web stranicu. Svi podaci su anonimizirani i ne mogu se koristiti za vašu identifikaciju.',
              linkedCategory: 'analytics',
              cookieTable: {
                caption: 'Tablica kolačića',
                headers: {
                  name: 'Kolačić',
                  domain: 'Domena',
                  desc: 'Opis'
                },
                body: [
                  {
                    name: '_ga',
                    domain: location.hostname,
                    desc: 'Opis 1'
                  },
                  {
                    name: '_gid',
                    domain: location.hostname,
                    desc: 'Opis 2'
                  }
                ]
              }
            },
            {
              title: 'Ciljanje i oglašavanje',
              description: 'Ovi se kolačići koriste kako bi oglasne poruke bile relevantnije za vas i vaše interese. Namjera je prikazati oglase koji su relevantni i privlačni za pojedinačnog korisnika, a time i vrijedniji za izdavače i oglašivače treće strane.',
              linkedCategory: 'ads'
            },
            {
              title: 'Više informacija',
              description: 'Za sve upite u vezi s našim pravilima o kolačićima i vašim izborima, <a href="#contact-page">kontaktirajte nas</a>'
            }
          ]
        },
        vendorsModal: {
          title: 'IAB popis dobavljača',
          allowAllConsentBtn: 'Dopusti sve',
          denyAllConsentBtn: 'Zabrani sve',
          allowSelectionBtn: 'Spremi postavke',
          viewPrivacyPolicyLabel: 'Pogledajte Pravila privatnosti',
          viewLegitimateInterestClaimLabel: 'Pogledajte tvrdnje za legitimni interes',
          viewDeviceStorageDisclosureLabel: 'Pogledajte Izjavu o pohrani uređaja',
          cookieLifespanLabel: 'Životni vijek kolačića',
          cookieLifespanMonthsLabel: 'Mjeseca',
          usesNonCookieAccessLabel: 'Ovaj dobavljač koristi druge metode pohrane ili pristupa informacijama osim kolačića',
          dataDeclarationLabel: 'Izjava o podacima',
          dataRetentionLabel: 'Zadržavanje podataka',
          standardRetentionLabel: 'Standardno zadržavanje',
          dataRetentionDaysLabel: 'Dana',
          consentPurposesLabel: 'Svrhe pristanka',
          legitimateInterestPurposesLabel: 'Svrhe legitimnog interesa',
          specialPurposesLabel: 'Posebne namjene',
          featuresLabel: 'Značajke',
          specialFeaturesLabel: 'Posebne značajke'
        }
      }
    }
  }
};

export default config;