import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import Markdown from "react-native-markdown-display";
import { useRouter } from "expo-router";

import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper";

import { useTextGenerator } from "@/app/utils/hooks/use-text-generator";
import { useTheme } from "@/app/theme/ThemeProvider";

import Navbar from "../../../components/navbar";

import { useStyles, getMarkdownStyles } from "./styles";

export default function AiResponseText() {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = useStyles(theme);
  const markdownStyles = getMarkdownStyles(theme);
  const { t } = useTranslation();

  const { question, setQuestion, history, loading, handleSend } =
    useTextGenerator(t);

  return (
    <View style={styles.container}>
      <Navbar showBackButton />
      <View style={styles.content}>
        <Text>{t("aiResponse.text.askAnything")} 🤖</Text>

        <TextInput
          mode="outlined"
          label={t("aiResponse.text.enterYourQuestion")}
          value={question}
          onChangeText={setQuestion}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSend}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {loading
              ? t("aiResponse.text.consulting")
              : t("aiResponse.text.toAsk")}
          </Text>
        </Button>

        {loading && <ActivityIndicator size="large" style={styles.loading} />}

        <ScrollView style={styles.aiResponseMarked}>
          {history.map((entry, index) => (
            <View key={index}>
              <Text
                style={{
                  fontWeight: entry.role === "user" ? "bold" : "normal",
                }}
              >
                {entry.role === "user" ? "Você" : "IA"}: {entry.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
        >
          {t("back")}
        </Button>
      </View>
    </View>
  );
}
