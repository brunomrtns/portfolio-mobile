import { MD3LightTheme, MD3DarkTheme, MD3Theme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#ffffff",
    primary: "#3f51b5",
    onPrimary: "#ffffff",
    surface: "#f5f5f5",
    onSurface: "#000000",
    text: "#000000",
  },
  customColors: {
    inputBackground: "#f0f0f0",
    buttonBackground: "#e0e0e0",
    buttonText: "#000000",
    buttonDisabledBackground: "#d6d6d6",
    buttonDisabledText: "#9e9e9e",
    titleText: "#3f51b5",
    codeBlockBackground: "#f5f5f5",
    codeBlockText: "#1e1e1e",
    codeBlockBorder: "#cccccc",
  },
  customTypography: {
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    body: {
      fontSize: 16,
      fontWeight: "normal",
    },
  },
} as MD3Theme & {
  customColors: Record<string, string>;
  customTypography: Record<string, any>;
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#121212",
    primary: "#bb86fc",
    onPrimary: "#ffffff",
    surface: "#1e1e1e",
    onSurface: "#e0e0e0",
    text: "#e0e0e0",
  },
  customColors: {
    inputBackground: "#1c1c1c",
    buttonBackground: "#2a2a2a",
    buttonText: "#e0e0e0",
    buttonDisabledBackground: "#444444",
    buttonDisabledText: "#777777",
    titleText: "#bb86fc",
    codeBlockBackground: "#1e1e1e",
    codeBlockText: "#e0e0e0",
    codeBlockBorder: "#333333",
  },
  customTypography: {
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    body: {
      fontSize: 16,
      fontWeight: "normal",
    },
  },
} as MD3Theme & {
  customColors: Record<string, string>;
  customTypography: Record<string, any>;
};
