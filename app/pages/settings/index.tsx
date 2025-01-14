import React, { useState } from "react";
import { View, Text } from "react-native";
import { List, Menu } from "react-native-paper";
import BrazilFlag from "../../../assets/flags/brazil.svg";
import UsaFlag from "../../../assets/flags/usa.svg";
import { useStyles } from "./styles";
import { useTheme } from "../../theme/ThemeProvider";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../../i18n";
import Navbar from "@/app/components/navbar";

export default function Settings() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "pt-BR");
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = useStyles(theme);

  const languages = [
    {
      value: "pt-BR",
      label: t("settings.languages.portuguese"),
      Flag: BrazilFlag,
    },
    {
      value: "en",
      label: t("settings.languages.english"),
      Flag: UsaFlag,
    },
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    changeLanguage(value);
    setMenuVisible(false);
  };

  return (
    <>
      <Navbar showBackButton />
      <View style={styles.container}>
        <Text style={styles.header}>{t("settings.screenTitle")}</Text>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <List.Item
              title={t("settings.languageLabel")}
              description={
                languages.find((lang) => lang.value === language)?.label
              }
              onPress={() => setMenuVisible(true)}
              left={() => {
                const Flag = languages.find(
                  (lang) => lang.value === language
                )?.Flag;
                return (
                  <View style={styles.flagIcon}>
                    {Flag && <Flag width={24} height={24} />}
                  </View>
                );
              }}
            />
          }
        >
          {languages.map(({ value, label, Flag }) => (
            <Menu.Item
              key={value}
              onPress={() => handleLanguageChange(value)}
              title={label}
              leadingIcon={() => <Flag width={24} height={24} />}
            />
          ))}
        </Menu>
      </View>
    </>
  );
}
