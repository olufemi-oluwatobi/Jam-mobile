import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./contexts/auth";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./screens";
import { NotificationProvider } from "./providers/notificationProvider";
import FirebaseProvider from "./providers/firebaseProvider";
import ThemeProvider from "./styles/provider";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    dity: require("../assets/fonts/dity.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyDDXiqDdExu297YFDj0PCDFV2XwJEx-0mE",
    authDomain: "lujo-d2375.firebaseapp.com",
    databaseURL: "https://lujo-d2375-default-rtdb.firebaseio.com",
    projectId: "lujo-d2375",
    storageBucket: "lujo-d2375.appspot.com",
    messagingSenderId: "981500300478",
    appId: "1:981500300478:web:02a1e159c533c0cc1aa2ef",
    measurementId: "G-R62N9XJY3D",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>
          <FirebaseProvider firebaseConfig={firebaseConfig}>
            <NativeBaseProvider>
              <NavigationContainer>
                <ThemeProvider>
                  <View style={[styles.container]} onLayout={onLayoutRootView}>
                    <StatusBar style="auto" />
                    <Screens />
                  </View>
                </ThemeProvider>
              </NavigationContainer>
            </NativeBaseProvider>
          </FirebaseProvider>
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "dity",
  },
});
