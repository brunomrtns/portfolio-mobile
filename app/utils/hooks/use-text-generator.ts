import { useState } from "react";
import axios from "axios";
import { Filter } from "bad-words";
import BadWordBr from "@/app/utils/constants/bad-word/bad-word-br.json";
import { CONSTANTS } from "../constants";

export function useTextGenerator(t: (key: string) => string) {
  const [question, setQuestion] = useState<string>("");
  const [history, setHistory] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const filter = new Filter();
  filter.addWords(...BadWordBr.words);

  const handleSend = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      if (filter.isProfane(question)) {
        setHistory((prev) => [
          ...prev,
          { role: "user", text: question },
          { role: "model", text: t("aiResponse.text.badWord") },
        ]);
        setQuestion("");
        return;
      }

      const URL_WITH_KEY = `${CONSTANTS.AI_RESPONSE.API_URLS.GOOGLE_GEMINI}?key=${CONSTANTS.AI_RESPONSE.API_KEYS.GOOGLE_GEMINI}`;

      // Monta o histórico no formato esperado pela API
      const requestData = {
        contents: history.concat({ role: "user", text: question }),
      };

      const aiResponseRaw = await axios.post(URL_WITH_KEY, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fullResponse =
        aiResponseRaw.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response.";

      setHistory((prev) => [
        ...prev,
        { role: "user", text: question },
        { role: "model", text: fullResponse },
      ]);
      setQuestion("");
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    history,
    loading,
    handleSend,
  };
}
