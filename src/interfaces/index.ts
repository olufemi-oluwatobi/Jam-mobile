import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RecordData = {
  type: "persona" | "record";
  data: any;
  variant: "md" | "lg" | "xl";
};

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
  Home: undefined;
  People: undefined;
  Votes: undefined;
  Music: undefined;
  Activity: undefined;
  Following: undefined;
  EditProfile: undefined;
  Record: { item: RecordData };
  Profile: { id: string | number };
};

export type AuthScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Auth">;
};

export type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "Onboarding">;
};

export type MainScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, "Home">;
};
