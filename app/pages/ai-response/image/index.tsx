import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";

import Navbar from "../../../components/navbar";
import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper";

import { useImageGenerator } from "@/app/utils/hooks/use-image-generator";

import { useTheme } from "@/app/theme/ThemeProvider";
import { useStyles } from "./styles";

export default function AiResponseImage() {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const { t } = useTranslation();

  const [prompt, setPrompt] = useState<string>("");
  const { imageUrl, loading, handleGenerateImage } = useImageGenerator();

  const handleGenerate = () => {
    handleGenerateImage(prompt);
  };

  return (
    <View style={styles.container}>
      <Navbar showBackButton />
      <View style={styles.content}>
        <Text>{t("aiResponse.image.describePrompt")} 🎨</Text>

        <TextInput
          mode="outlined"
          label={t("aiResponse.image.enterYourPrompt")}
          value={prompt}
          onChangeText={setPrompt}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleGenerate}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {loading
              ? t("aiResponse.image.generating")
              : t("aiResponse.image.generateImage")}
          </Text>
        </Button>

        {loading && <ActivityIndicator size="large" style={styles.loading} />}

        <ScrollView contentContainerStyle={styles.imageContainer}>
          {imageUrl && (
            <Image
              style={styles.generatedImage}
              source={{ uri: "data:image/jpeg;base64," + imageUrl }}
              resizeMode="contain"
              onError={(e) =>
                console.error("Image load error:", e.nativeEvent.error)
              }
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}
