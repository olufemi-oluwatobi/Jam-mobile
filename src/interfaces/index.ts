import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
};

export type OnboardingStackParamList = {
  Onboarding: undefined;
  ConnectStreamApp: undefined;
  SelectFavouriteGenres: undefined;
  SelectFavouriteArtists: undefined;
};

export type MainStackParamList = {
  Main: undefined;
};

export type AuthScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Auth">;
};

export type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "Onboarding">;
};
