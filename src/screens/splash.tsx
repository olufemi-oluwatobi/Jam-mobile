import React, { useEffect } from "react";
import { View, Text, Image } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const window = Dimensions.get("window");

const SplashScreenComponent = () => {
  useEffect(() => {
    async function preventAutoHide() {
      await SplashScreen.preventAutoHideAsync();
    }

    preventAutoHide();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        alt="Splash Screen"
        source={{
          uri: "https://res.cloudinary.com/drda29q8x/image/upload/v1675943964/Jam%20images/tobiloba_a_a_music_critique_community_where_young_people_rate_a_fcee3505-129b-427e-b810-21fd895f628e_1_s7ve4p.png",
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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

export default SplashScreenComponent;
