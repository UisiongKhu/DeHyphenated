import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import resources from './resource';

i18n
.use(initReactI18next)
.init({
    fallbackLng: "en",
    lng: "tg_POJ",
    resources,
    interpolation:{
        escapeValue: false,
    }
});

export default i18n;

