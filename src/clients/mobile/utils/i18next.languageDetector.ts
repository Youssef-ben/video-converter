import type { LanguageDetectorModule } from 'i18next';
import { NativeModules, Platform } from 'react-native';

const RNLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  cacheUserLanguage: () => {},
  detect: () => {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] || '' // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    // Default to {en} as a language
    return locale.split('_')[0] || 'en';
  },
};

export default RNLanguageDetector;
