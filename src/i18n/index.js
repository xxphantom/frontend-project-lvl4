import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

export default async () => {
  const i18nextInstanse = i18n.createInstance();
  await i18nextInstanse.use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  return i18nextInstanse;
};
