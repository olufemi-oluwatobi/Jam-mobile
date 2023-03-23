import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import {
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import { OnboardingScreenProps } from "../../interfaces";
import { useAuth } from "../../hooks/useAuth";
import { Theme } from "../../styles/theme";
import { VStack } from "native-base";
import Svg, { Path } from "react-native-svg";

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      height: Dimensions.get("window").height,
      backgroundColor: "#07171F",
    },
    banner: {
      width: Dimensions.get("window").width,
      height: 400,
    },
    containerInner: {
      padding: 20,
      paddingTop: 20,
      marginTop: 5,
      backgroundColor: "#07171F",
    },
    mainHeaderText: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.white,
    },
    supportingText: {
      fontSize: 18,
      marginBottom: 20,
      lineHeight: 24,
      fontWeight: "bold",
      color: theme.colors.white,
      textAlign: "center",
    },
    socialSigninContainer: {
      marginBottom: 20,
      marginTop: 20,
    },
    socialSigninButton: {
      backgroundColor: theme.colors.black,
      color: theme.colors.white,
      borderStyle: "solid",
      borderWidth: 0.5,
      borderColor: "#B7B7B7",
      marginTop: 30,
      padding: 15,
      paddingLeft: 35,
      paddingRight: 35,
      borderRadius: 20,
      marginBottom: 10,
      text: {
        color: theme.colors.white,
        fontWeight: "bold",
      },
    },
    mainButton: {
      backgroundColor: theme.colors.brand,
      padding: 10,
      height: 53,
      marginTop: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
    },
    mainButtonText: {
      color: theme.colors.black,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
    },
    signupPromptContainer: {
      flexDirection: "row",
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    signupPromptText: {
      color: theme.colors.white,
      fontWeight: "bold",
    },
    signupPromptButton: {
      marginLeft: 2,
      fontWeight: "bold",
      color: theme.colors.brand,
    },
  });
};
const LoginPage = (props: OnboardingScreenProps) => {
  const { user } = useAuth();
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/drda29q8x/image/upload/v1675943964/Jam%20images/tobiloba_a_a_music_critique_community_where_young_people_rate_a_fcee3505-129b-427e-b810-21fd895f628e_1_s7ve4p.png",
              }}
              alt="banner"
              style={styles.banner}
            ></Image>
            <View style={styles.containerInner}>
              <VStack space={4} alignItems="center">
                <Text style={styles.mainHeaderText}>
                  Hello {user?.username}
                </Text>
              </VStack>
              <VStack space={4} alignItems="center">
                <Text style={styles.supportingText}>
                  Welcome to the club of taste-makers! Time to mingle with your
                  fellow connoisseurs
                </Text>
              </VStack>
              <TouchableHighlight
                onPress={() => props.navigation.navigate("ConnectStreamApp")}
                style={styles.mainButton}
              >
                <Text style={styles.mainButtonText}>Let's Start</Text>
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#000"
                  width={25}
                  height={25}
                  style={{ marginLeft: 10 }}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </Svg>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
