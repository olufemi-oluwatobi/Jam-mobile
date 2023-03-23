import React, { useState } from "react";
import Svg, { Path } from "react-native-svg";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import useTheme from "../../../hooks/useTheme";
import NotificationIndicator from "../NotificationIndicator";

type HeaderProps = {
  avatar: any;
  headerText: string;
};

const Header: React.FC<HeaderProps> = ({ avatar, headerText }) => {
  const theme = useTheme();
  const notifications = [];
  const [showNotification, setShowNotification] = useState(true);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.darkGrey}
      />
      <View style={styles.container}>
        <View style={styles.left}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={[styles.headerText, { color: theme.colors.white }]}>
            {headerText}
          </Text>
        </View>
        <View style={styles.right}>
          <TouchableHighlight style={[styles.iconButton, { marginRight: 10 }]}>
            <Svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke={theme.colors.white}
              width={25}
              height={25}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
              />
            </Svg>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={toggleNotification}
          >
            <NotificationIndicator count={notifications.length} />
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0a0910",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    height: 100,
    color: "white",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 2,
  },
});

export default Header;
