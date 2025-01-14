import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONSTANTS } from "./constants";
import axios from "axios";

export const setAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(CONSTANTS.AUTH.TOKEN_KEY, token);
  } catch (error) {
    console.error("Erro ao salvar token:", error);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(CONSTANTS.AUTH.TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
};

export const clearAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(CONSTANTS.AUTH.TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao remover token:", error);
  }
};

let validateTokenPromise: Promise<boolean> | null = null;

export const validateToken = async (): Promise<boolean> => {
  if (validateTokenPromise) {
    console.log(
      "Validação de token já em andamento. Retornando a mesma promessa."
    );
    return validateTokenPromise;
  }

  validateTokenPromise = (async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("Token não encontrado");
        return false;
      }

      const response = await axios.post(
        `${CONSTANTS.AUTH.SERVER}/users/validate-token`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log("Token válido");
        return true;
      }

      console.log("Token inválido");
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao validar token:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Erro desconhecido:", error);
      }
      return false;
    } finally {
      validateTokenPromise = null;
    }
  })();

  return validateTokenPromise;
};
