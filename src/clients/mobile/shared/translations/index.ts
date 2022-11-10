import type { LanguageDetectorModule } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import en from './resources/en';
import fr from './resources/fr';

const defaultLang = 'en';
const supportedLanguages = ['en', 'fr'];

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  cacheUserLanguage: () => {},
  detect: () => {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] || '' // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    const [lowerCaseLocale] = locale.split('_');
    return supportedLanguages.includes(lowerCaseLocale) ? lowerCaseLocale : defaultLang;
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',

    fallbackLng: defaultLang,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en,
      fr,
    },
  });

export default i18n;
