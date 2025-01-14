import { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { CONSTANTS } from "../constants";

export function useImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateImageWithRetry = async (
    prompt: string,
    retries = 5,
    delay = 60
  ): Promise<string | null> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Tentativa ${attempt} de ${retries}`);

        const response = await axios.post(
          `${CONSTANTS.AI_RESPONSE.API_URLS.DIFFUSION}`,
          { inputs: prompt },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${CONSTANTS.AI_RESPONSE.API_KEYS.HUGGINGFACE}`,
            },
            responseType: "arraybuffer",
          }
        );

        if (response.status === 503) {
          const { error, estimated_time } = response.data;
          console.warn(
            `Modelo ainda está carregando (${error}). Tentando novamente em ${
              estimated_time || delay
            } segundos...`
          );
          await new Promise((resolve) =>
            setTimeout(resolve, (estimated_time || delay) * 1000)
          );
          continue;
        }

        if (response.headers["content-type"] === "image/jpeg") {
          const base64Image = `data:image/jpeg;base64,${Buffer.from(
            response.data,
            "binary"
          ).toString("base64")}`;
          return base64Image;
        }

        throw new Error("Resposta inesperada. Tipo de conteúdo inválido.");
      } catch (error) {
        console.error(
          `Erro na tentativa ${attempt}:`,
          error instanceof Error ? error.message : String(error)
        );

        if (attempt === retries) {
          throw new Error("Falha após múltiplas tentativas.");
        }

        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      }
    }
    return null;
  };

  const handleGenerateImage = async (prompt: string) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl(null);

    try {
      const base64Image = await generateImageWithRetry(prompt);
      setImageUrl(base64Image ?? null);
    } catch (error) {
      console.error(
        "Erro ao gerar imagem:",
        error instanceof Error ? error.message : String(error)
      );
      setImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    imageUrl,
    loading,
    handleGenerateImage,
  };
}
