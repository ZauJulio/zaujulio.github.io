import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './i18n/locales/en.json';
import ptBR from './i18n/locales/pt-BR.json';

const resources = {
  en: { translation: en },
  'pt-BR': { translation: ptBR },
};

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
