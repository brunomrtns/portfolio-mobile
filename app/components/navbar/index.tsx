import React, { useRef, useState } from "react";
import { Animated } from "react-native";
import { useTranslation } from "react-i18next";

import { Appbar, IconButton } from "react-native-paper";

import { StackNavigationProp } from "@react-navigation/stack";

import { useNavigation, useRouter } from "expo-router";

import { useTheme } from "@/app/theme/ThemeProvider";

import SideMenu from "./side-menu";

type HomeScreenNavigationProp = StackNavigationProp<any>;

export default function Navbar({ showBackButton = false }) {
  const { toggleTheme, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const rotation = useRef(new Animated.Value(0)).current;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleToggleTheme = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0);
    });
    toggleTheme();
  };

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <Appbar.Header>
        {showBackButton && (
          <Appbar.BackAction
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                router.push("/pages/home");
              }
            }}
          />
        )}

        <Appbar.Content
          title={t("applicationName")}
          onPress={() => router.push("/pages/home")}
        />

        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <IconButton
            icon={isDarkMode ? "moon-waning-crescent" : "white-balance-sunny"}
            size={24}
            onPress={handleToggleTheme}
          />
        </Animated.View>

        <IconButton icon="menu" size={24} onPress={handleMenuToggle} />
      </Appbar.Header>

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  );
}
