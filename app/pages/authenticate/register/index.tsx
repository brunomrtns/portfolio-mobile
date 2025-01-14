import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";
import axios from "axios";

import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { CONSTANTS } from "@/app/utils/constants";

import { useTheme } from "../../../theme/ThemeProvider";

import { useStyles } from "../styles";

export default function CreateUserPage() {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const { t } = useTranslation();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateUser = async () => {
    if (!name || !username || !email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${CONSTANTS.AUTH.SERVER}/users/create`,
        {
          name,
          username,
          email,
          password,
        }
      );

      console.log("Usuário criado com sucesso:", response.data);

      router.push("/pages/authenticate/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.err || "Erro ao criar conta.");
      } else {
        setError("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        mode="outlined"
        label={t("authenticate.register.name")}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label={t("authenticate.register.username")}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label={t("authenticate.register.email")}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label={t("authenticate.register.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleCreateUser}
        disabled={loading}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          t("authenticate.login.register")
        )}
      </Button>

      <Button
        mode="text"
        onPress={() => router.push("/pages/authenticate/login")}
        style={styles.button}
      >
        {t("authenticate.register.backToLogin")}
      </Button>
    </View>
  );
}
