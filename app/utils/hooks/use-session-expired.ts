import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter, useSegments } from "expo-router";

import { validateToken } from "@/app/utils/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const useSessionExpired = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionHandled, setSessionHandled] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const currentRoute = `/${segments.join("/")}`;
  console.log("Current Route:", currentRoute);

  const handleSessionExpired = async () => {
    if (
      sessionHandled ||
      modalVisible ||
      currentRoute === "/pages/authenticate/login"
    ) {
      return;
    }
    setSessionHandled(true);
    await AsyncStorage.removeItem("authToken");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSessionHandled(false);
    router.push("/pages/authenticate/login");
  };

  useEffect(() => {
    const validateAndHandleToken = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        await handleSessionExpired();
      }
    };

    validateAndHandleToken();

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response?.data?.err === "token inválido"
        ) {
          await handleSessionExpired();
          return new Promise(() => {});
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [modalVisible, sessionHandled, currentRoute]);

  return {
    modalVisible,
    closeModal,
  };
};

export default useSessionExpired;
