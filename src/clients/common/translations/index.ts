import type { LanguageDetectorModule } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './resources/en';
import fr from './resources/fr';

export function setTranslation(languageDetector: LanguageDetectorModule) {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',

      fallbackLng: 'en',

      interpolation: {
        escapeValue: false,
      },

      resources: {
        en,
        fr,
      },
    });

  return i18n;
}

export default i18n;
