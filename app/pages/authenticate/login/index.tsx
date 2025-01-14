import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";
import axios from "axios";

import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "@/app/theme/ThemeProvider";
import { CONSTANTS } from "@/app/utils/constants";

import { useStyles } from "../styles";

export default function LoginPage() {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const { t } = useTranslation();

  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      const response = await axios.post(
        `${CONSTANTS.AUTH.SERVER}/authenticate`,
        {
          emailOrUsername,
          password,
        }
      );

      const { token } = response.data;

      await AsyncStorage.setItem("authToken", token);

      router.push("/pages/home");
    } catch (error) {
      console.error("Erro durante o login:", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status || "Sem status";
        const errMessage = error.response?.data?.err || error.message;
        const responseData = error.response?.data || "Sem dados de resposta";

        setError(
          `Erro ao autenticar. Status: ${status}. Mensagem: ${errMessage}`
        );

        setDebugInfo(
          `DEBUG: Status: ${status}\nMensagem: ${errMessage}\nDados completos: ${JSON.stringify(
            responseData,
            null,
            2
          )}`
        );
      } else {
        setError("Erro desconhecido.");
        setDebugInfo(`DEBUG: ${JSON.stringify(error, null, 2)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error && <Text style={styles.error}>{error}</Text>}
      {debugInfo && (
        <Text style={[styles.error, { fontSize: 10, marginTop: 10 }]}>
          {debugInfo}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label={t("authenticate.login.emailOrUsername")}
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label={t("authenticate.login.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        disabled={loading}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          t("authenticate.login.label")
        )}
      </Button>

      <Button
        mode="text"
        onPress={() => router.push("/pages/authenticate/register")}
        style={styles.button}
      >
        {t("authenticate.login.register")}
      </Button>
    </View>
  );
}
