import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './locales/pt.json';
import en from './locales/en.json';

export default i18n.use(initReactI18next).init({
  resources: {
    pt: { ...pt },
    en: { ...en },
  },
  lng: 'pt',
  fallbackLng: 'pt',
});
