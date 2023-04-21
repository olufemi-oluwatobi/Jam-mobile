import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import { AuthScreenProps } from "../interfaces";
import {
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import Input from "../components/form/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth, useLogin, useRegister } from "../hooks/useAuth";
import Svg, { Path } from "react-native-svg";
import { VStack } from "native-base";
import useTheme from "../hooks/useTheme";
import { Theme } from "../styles/theme";

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.black,
    },
    banner: {
      width: "100%",
      height: 200,
    },
    containerInner: {
      padding: 20,
      paddingTop: 20,
      marginTop: 5,
      backgroundColor: theme.colors.black,
    },
    signupText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.white,
    },
    inputLabel: {
      color: theme.colors.white,
      marginBottom: 10,
      fontSize: 16,
    },
    inputContainer: {
      marginBottom: 10,
    },
    input: {
      backgroundColor: theme.colors.darkGrey,
      color: theme.colors.white,
      padding: 10,
      height: 53,
      borderRadius: 5,
      marginBottom: 15,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      borderStyle: "dash",
      backgroundColor: theme.colors.grey,
    },
    dividerText: {
      color: theme.colors.grey,
      paddingHorizontal: 10,
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
    loginButton: {
      backgroundColor: theme.colors.brand,
      padding: 10,
      height: 53,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      marginBottom: 20,
    },
    loginButtonText: {
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

const SignInValidation = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUpPage = (props: AuthScreenProps) => {
  const auth = useAuth();
  const { registerUser, isLoading } = useRegister();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: SignInValidation,
    onSubmit: async (value) => {
      try {
        registerUser(value);
      } catch (error) {}
    },
  });

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
                uri: "https://res.cloudinary.com/drda29q8x/image/upload/v1676066796/Jam%20images/tobiloba_Generate_an_image_of_a_community_of_young_modern_music_a25cdd37-f34a-4a7c-9972-469290f4b350_1_1_l7uhdw.png",
              }}
              alt="banner"
              style={styles.banner}
            ></Image>
            <View style={styles.containerInner}>
              <VStack space={4} alignItems="center">
                <Text style={styles.signupText}>Sign up</Text>
              </VStack>
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                onChangeText={form.handleChange("email")}
                value={form.values.email}
              />
              <Input
                label="Username"
                placeholder="Enter your username"
                onChangeText={form.handleChange("username")}
                value={form.values.username}
              />
              <Input
                label="Password"
                secureTextEntry
                placeholder="Enter your password"
                onChangeText={form.handleChange("password")}
                value={form.values.password}
              />
              <Input
                label="Confirm Password"
                secureTextEntry
                placeholder="Enter your password"
                onChangeText={form.handleChange("password")}
                value={form.values.password}
              />

              <TouchableHighlight
                style={styles.loginButton}
                onPress={() => form.handleSubmit()}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? "Loading" : "Sign Up"}
                </Text>
              </TouchableHighlight>

              <PageDivider />

              <View style={styles.socialSigninContainer}>
                <VStack style={{ alignItems: "center" }}>
                  <Text
                    style={[styles.socialSigninButton.text, { fontSize: 16 }]}
                  >
                    Or sign in with
                  </Text>
                </VStack>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableHighlight style={styles.socialSigninButton}>
                    <VStack
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Svg width={25} height={25} fill="none">
                        <Path
                          d="M25 12.8c0-.844-.083-1.716-.222-2.533H12.747v4.82h6.89c-.277 1.553-1.194 2.914-2.556 3.786l4.112 3.131C23.611 19.8 25 16.585 25 12.8Z"
                          fill="#4280EF"
                        />
                        <Path
                          d="M12.746 25c3.446 0 6.336-1.116 8.447-3.023l-4.112-3.104c-1.14.762-2.612 1.198-4.335 1.198-3.334 0-6.14-2.206-7.168-5.147L1.354 18.11C3.522 22.331 7.912 25 12.746 25Z"
                          fill="#34A353"
                        />
                        <Path
                          d="M5.578 14.897a7.45 7.45 0 0 1 0-4.793L1.355 6.89a12.294 12.294 0 0 0 0 11.22l4.223-3.213Z"
                          fill="#F6B704"
                        />
                        <Path
                          d="M12.746 4.957a7.036 7.036 0 0 1 4.89 1.879l3.64-3.595c-2.305-2.124-5.362-3.268-8.53-3.24C7.912 0 3.522 2.668 1.354 6.89l4.224 3.213c1.028-2.969 3.834-5.147 7.168-5.147Z"
                          fill="#E54335"
                        />
                      </Svg>
                      <Text
                        style={{
                          ...styles.socialSigninButton.text,
                          marginLeft: 10,
                        }}
                      >
                        Google
                      </Text>
                    </VStack>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.socialSigninButton}>
                    <VStack
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Svg width={25} height={25} fill="none">
                        <Path
                          d="M12.5 0C5.597 0 0 5.597 0 12.5 0 19.404 5.597 25 12.5 25 19.404 25 25 19.404 25 12.5 25 5.597 19.404 0 12.5 0Zm5.732 18.029a.779.779 0 0 1-1.071.258c-2.935-1.793-6.63-2.199-10.981-1.204a.78.78 0 0 1-.347-1.52c4.762-1.088 8.846-.62 12.141 1.394a.779.779 0 0 1 .258 1.072Zm1.53-3.404a.975.975 0 0 1-1.34.321c-3.36-2.065-8.482-2.663-12.456-1.457a.976.976 0 0 1-1.216-.649.976.976 0 0 1 .65-1.215c4.54-1.378 10.183-.71 14.042 1.66a.974.974 0 0 1 .32 1.34Zm.132-3.544C15.865 8.688 9.218 8.468 5.372 9.636a1.169 1.169 0 1 1-.679-2.238C9.11 6.058 16.45 6.317 21.087 9.07a1.168 1.168 0 1 1-1.193 2.01Z"
                          fill="#1ED760"
                        />
                      </Svg>
                      <Text
                        style={[
                          styles.socialSigninButton.text,
                          { marginLeft: 10 },
                        ]}
                      >
                        Spotify
                      </Text>
                    </VStack>
                  </TouchableHighlight>
                </View>
              </View>

              <View style={styles.signupPromptContainer}>
                <Text style={styles.signupPromptText}>
                  Already have an account?
                </Text>
                <TouchableHighlight
                  onPress={() => props.navigation.navigate("Login")}
                  style={styles.signupPromptButton}
                >
                  <Text style={styles.signupPromptButton}>Login</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerInner: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    width: "100%",
    height: 200,
    backgroundColor: "#F5F5F5",
  },
  signupText: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B7B7B7",
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#B7B7B7",
    width: "100%",
    height: 1,
    marginBottom: 20,
  },
  dividerContainer: {
    alignItems: "center",
  },
  socialSigninContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  socialSigninButton: {
    backgroundColor: "#E9E9E9",
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#777777",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  signupPromptContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupPromptText: {
    marginRight: 10,
  },
  signupPromptButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#777777",
  },
});

export default SignUpPage;

const PageDivider = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dash: {
      width: theme.spacing.m,
      height: 2,
      backgroundColor: theme.colors.grey,
    },
  });

  const { width } = Dimensions.get("window");
  const dashCount = Math.ceil(width / 25);
  return (
    <View style={styles.dividerContainer}>
      {Array(dashCount)
        .fill(0)
        .map((_, i) => (
          <View key={i} style={styles.dash} />
        ))}
    </View>
  );
};
