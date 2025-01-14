import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import { PaperProvider } from "react-native-paper";
import { store } from "./redux/store";
import { loadLanguage } from "../i18n";

function RootStack() {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}

export default function Layout() {
  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </Provider>
  );
}
