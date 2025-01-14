import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const useStyles = (
  theme: MD3Theme & { customColors: Record<string, string> }
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    card: {
      marginBottom: 20,
      backgroundColor: theme.colors.surface,
    },
    title: {
      marginBottom: 10,
      color: theme.customColors.text,
    },
    input: {
      marginTop: 10,
      backgroundColor: theme.customColors.inputBackground,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    text: {
      marginLeft: 10,
      color: theme.customColors.text,
    },
    divider: {
      marginVertical: 10,
      backgroundColor: theme.colors.onSurface,
    },
    fab: {
      position: "absolute",
      bottom: 20,
      right: 20,
    },
    button: {
      marginTop: 16,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
    },
    buttonText: {
      color: theme.colors.onPrimary,
      fontWeight: "600",
    },
  });
