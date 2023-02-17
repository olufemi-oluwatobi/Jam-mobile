import React, { useState, useEffect } from "react";
import { View, Text, Image } from "native-base";
import SplashScreen from "./splash";
import { StyleSheet, Dimensions } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import MainScreen from "./main";
import LoginScreen from "./login";
import SignUp from "./signup";
import {
  GetStarted,
  ConnectStreamApp,
  SelectFavouriteGenres,
  SelectFavouriteArtists,
} from "./onboarding";
import {
  AuthStackParamList,
  OnboardingStackParamList,
  MainStackParamList,
} from "../interfaces";
import { useAuth } from "../hooks/useAuth";
const window = Dimensions.get("window");

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "Onboarding">;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Onboarding Screen</Text>
    </View>
  );
};

const Screens = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [isOnboarding, setIsOnboarding] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  }, []);

  const renderMainScreen = () => {
    if (isLoading) {
      return <SplashScreen />;
    }
    if (!user) {
      return (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Signup"
            component={SignUp}
          />
        </AuthStack.Navigator>
      );
    }
    if (user && !isOnboarding) {
      return (
        <OnboardingStack.Navigator>
          <OnboardingStack.Screen
            options={{
              headerShown: false,
            }}
            component={GetStarted}
            name="Onboarding"
          />
          <OnboardingStack.Screen
            options={{
              headerShown: false,
            }}
            component={ConnectStreamApp}
            name="ConnectStreamApp"
          />
          <OnboardingStack.Screen
            options={{
              headerShown: false,
            }}
            name="SelectFavouriteGenres"
            component={SelectFavouriteGenres}
          />
          <OnboardingStack.Screen
            options={{
              headerShown: false,
            }}
            name="SelectFavouriteArtists"
            component={SelectFavouriteArtists}
          />
        </OnboardingStack.Navigator>
      );
    } else {
      return <MainScreen />;
    }
  };
  return (
    <View style={{ height: "100%", width: "100%" }}>{renderMainScreen()}</View>
  );
};

export default Screens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0000",
  },
  image: {
    width: window.width,
    height: window.height,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});
