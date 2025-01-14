import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native-paper";

import Navbar from "@/app/components/navbar";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { useStyles } from "./styles";

import { useTheme } from "@/app/theme/ThemeProvider";

// import ProtectedRoute from "../../components/protected-route";

type HomeScreenNavigationProp = StackNavigationProp<any>;

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t("homeScreen.screenName"),
    });
  }, [navigation, t]);

  return (
    // <ProtectedRoute>
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>{t("homeScreen.welcome")}</Text>
        <View style={styles.spacer} />
        <Text>{t("homeScreen.aiResponse")}</Text>
        <Button
          mode="contained"
          onPress={() => router.push("/pages/ai-response/text")}
          style={styles.button}
        >
          <Text style={styles.labelButton}>{t("aiResponse.text.askMe")}</Text>
        </Button>
        <View style={styles.spacer} />
        <Button
          mode="contained"
          onPress={() => router.push("/pages/ai-response/image")}
          style={styles.button}
        >
          <Text style={styles.labelButton}>{t("aiResponse.image.askMe")}</Text>
        </Button>
        <View style={styles.spacer} />
        <Button
          mode="contained"
          onPress={() => router.push("/pages/react-native-paper")}
          style={styles.button}
        >
          <Text style={styles.labelButton}>
            {t("reactNativePaper.goScreen")}
          </Text>
        </Button>
      </View>
    </View>
    // </ProtectedRoute>
  );
}
