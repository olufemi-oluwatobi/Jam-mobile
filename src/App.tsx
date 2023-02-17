import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./contexts/auth";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./screens";
import ThemeProvider from "./styles/provider";
import { StyleSheet, View } from "react-native";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <ThemeProvider>
              <View style={styles.container}>
                <StatusBar style="auto" />
                <Screens />
              </View>
            </ThemeProvider>
          </NavigationContainer>
        </NativeBaseProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
