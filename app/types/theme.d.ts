import "react-native-paper";

declare module "react-native-paper" {
  export interface MD3Theme {
    customColors: {
      inputBackground: string;
      buttonBackground: string;
      buttonText: string;
      titleText: string;
    };
    customTypography: {
      title: {
        fontSize: number;
        fontWeight: string;
      };
      subtitle: {
        fontSize: number;
        fontWeight: string;
      };
      body: {
        fontSize: number;
        fontWeight: string;
      };
    };
  }
}
