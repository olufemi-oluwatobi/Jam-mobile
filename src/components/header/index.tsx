import React from "react";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack } from "native-base";
import { MainScreenProps } from "../../interfaces";

const Header: React.FC<
  Partial<MainScreenProps> & {
    title: string;
    showActionsButtons?: boolean;
  }
> = ({ navigation, title, showActionsButtons = true }) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.darkGrey}
      />
      <View style={styles.header}>
        <HStack alignItems="center" justifyContent="space-between" width="100%">
          {navigation ? (
            <TouchableHighlight onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableHighlight>
          ) : (
            <View></View>
          )}
          <VStack alignItems="center" justifyContent="center">
            <Text style={styles.headerTitle}>{title}</Text>
          </VStack>
          {showActionsButtons ? (
            <HStack space={3}>
              <TouchableHighlight onPress={() => console.log("Notifications")}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => console.log("Menu")}>
                <Ionicons name="menu-outline" size={24} color="#fff" />
              </TouchableHighlight>
            </HStack>
          ) : (
            <View></View>
          )}
        </HStack>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: (StatusBar.currentHeight || 30) + 10,
    height: 100,
    color: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "lowercase",
  },
});

export default Header;
