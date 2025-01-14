import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import { useRouter } from "expo-router";

import { validateToken } from "@/app/utils/auth";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      if (isValid) {
        setAuthenticated(true);
      } else {
        router.push("/pages/authenticate/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return authenticated ? children : null;
}
