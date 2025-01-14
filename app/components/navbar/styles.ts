import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const useStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    navbar: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      elevation: 3,
    },
    navTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    icons: {
      flexDirection: "row",
      alignItems: "center",
    },
    themeIcon: {
      marginLeft: 12,
    },
    flag: {
      marginHorizontal: 6,
    },
    iconWrapper: {
      justifyContent: "center",
      alignItems: "center",
      width: 32,
      height: 32,
      marginLeft: 12,
    },
    header: {
      elevation: 4,
    },
    sideMenuOverlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
  });
};
