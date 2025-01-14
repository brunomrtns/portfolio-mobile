import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const useStyles = (
  theme: MD3Theme & {
    customColors: Record<string, string>;
    customTypography: Record<string, any>;
  }
) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
      width: 250,
      alignSelf: "flex-end",
      elevation: 5,
    },
    header: {
      color: theme.colors.onBackground,
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    closeButton: {
      marginRight: 8,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: theme.customTypography.title.fontSize,
      fontWeight: theme.customTypography.title.fontWeight,
    },
    drawerItem: {
      marginVertical: 8,
    },
  });
