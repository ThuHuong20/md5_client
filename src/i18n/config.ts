import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './translations/en'
import vi from './translations/vi'
import ja from './translations/ja'

function setLocalLanguage() {
    let locales = localStorage.getItem("locales");
    return locales ? locales : 'en'
}
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: setLocalLanguage(), // if you're using a language detector, do not define the lng option
        fallbackLng: "en", // khi chon ngon ngu sai se chon ngon ngu mac dinh
        debug: false,
        resources: {
            en: {
                translation: en,
            },
            vi: {
                translation: vi,
            },
            ja: {
                translation: ja,
            },
        },
    });

export default i18n