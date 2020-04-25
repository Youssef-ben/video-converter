import englishMessages from '../../i18/en.json';
import frenchMessages from '../../i18/fr.json';

// Object with all the supported Languages.
const LANGUAGES = {
  ENGLISH: 'en',
  FRENCH: 'fr',
};

// Ressources of all the supported languages.
const MESSAGES = {
  en: englishMessages,
  fr: frenchMessages,
};

// Browser language without region code.
const BROWSER_LANGUAGE = navigator.language.split(/[-_]/)[0];

function getLanguagesResources(lang) {
  return MESSAGES[lang];
}

export {
  LANGUAGES,
  BROWSER_LANGUAGE,
  // Methods
  getLanguagesResources,
};
