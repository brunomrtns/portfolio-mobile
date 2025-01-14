import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const useStyles = (
  theme: MD3Theme & {
    customColors: Record<string, string>;
    customTypography: Record<string, any>;
  }
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    title: {
      fontSize: theme.customTypography.title.fontSize,
      fontWeight: theme.customTypography.title.fontWeight,
      marginBottom: 10,
      color: theme.customColors.titleText,
    },
    text: {
      fontSize: 18,
      fontWeight: "500",
      textAlign: "center",
      marginBottom: 10,
      color: theme.customColors.text,
    },
    button: {
      backgroundColor: theme.customColors.buttonBackground,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginVertical: 8,
    },
    buttonText: {
      color: theme.customColors.buttonText,
      fontSize: 16,
      fontWeight: "600",
    },
    spacer: {
      height: 20,
    },
    labelButton: {
      color: theme.colors.onBackground,
    },
  });
