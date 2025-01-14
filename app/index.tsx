import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useNavigationState } from "@react-navigation/native";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isReady = useNavigationState((state) => state?.key !== undefined);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isReady) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      router.push("/pages/home");
      setLoading(false);
    };

    checkAuth();
  }, [isReady, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
