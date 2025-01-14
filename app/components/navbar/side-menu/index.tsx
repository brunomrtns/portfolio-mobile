import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import { Drawer, IconButton, Divider } from "react-native-paper";

import { useRouter } from "expo-router";

import { useTheme } from "@/app/theme/ThemeProvider";

import { useStyles } from "./styles";

export default function SideMenu({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = useStyles(theme);
  const { t } = useTranslation();

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path as any);
  };

  const handleLogout = () => {
    onClose();
    router.push("/pages/authenticate/login");
  };

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        onClose();
      }}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.header}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={onClose}
              style={styles.closeButton}
            />
            <Text style={styles.title}>Menu</Text>
          </View>
          <Divider />

          <Drawer.Section>
            <Drawer.Item
              label={t("navbar.subMenu.items.account")}
              onPress={() => handleNavigation("/pages/account")}
              style={styles.drawerItem}
            />
            <Drawer.Item
              label={t("navbar.subMenu.items.settings")}
              onPress={() => handleNavigation("/pages/settings")}
              style={styles.drawerItem}
            />
          </Drawer.Section>
          <Drawer.Item
            label={t("navbar.subMenu.items.back")}
            onPress={handleLogout}
            style={styles.drawerItem}
            icon="logout"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
