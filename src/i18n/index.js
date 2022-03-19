import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from 'i18n/locales';

const i18nextInstanse = i18n.createInstance();

export default async () => {
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
