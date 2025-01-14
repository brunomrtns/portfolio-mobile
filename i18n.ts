import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./public/locales/en.json";
import ptBR from "./public/locales/pt-br.json";

const deviceLanguage = Localization.locale || "en";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
  },
  lng: deviceLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = async (lng: string) => {
  await AsyncStorage.setItem("language", lng);
  i18next.changeLanguage(lng);
};

export const loadLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem("language");
  if (savedLanguage) {
    i18next.changeLanguage(savedLanguage);
  }
};

export default i18next;
