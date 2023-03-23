import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { OnboardingScreenProps } from "../../interfaces";
import { Theme } from "../../styles/theme";
import useTheme from "../../hooks/useTheme";

const Service = ({
  serviceName,
  logoUrl,
}: {
  serviceName: string;
  logoUrl: string;
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.serviceButton}>
      <Image source={{ uri: logoUrl }} style={styles.serviceLogo} />
      <Text style={styles.serviceText}>{serviceName}</Text>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#07171F",
      padding: 20,
    },
    icon: {
      width: 50,
      height: 50,
    },
    mainText: {
      fontSize: 22,
      marginTop: 20,
      fontWeight: "bold",
      color: theme.colors.white,
      textAlign: "center",
    },
    supportingText: {
      fontSize: 14,
      marginTop: 20,
      fontWeight: "bold",
      color: theme.colors.white,
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "column",
      marginTop: 20,
      padding: 20,
      width: Dimensions.get("window").width,
    },
    serviceButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#B7B7B7",
      padding: 15,
      fontSize: 16,
      marginBottom: 20,
      borderRadius: 10,
    },
    serviceLogo: {
      width: 25,
      height: 25,
    },
    serviceText: {
      fontSize: 14,
      color: theme.colors.white,
      marginLeft: 10,
    },
    mainButton: {
      backgroundColor: theme.colors.brand,
      padding: 10,
      height: 53,
      marginTop: 30,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      width: Dimensions.get("window").width - 40,
    },
    mainButtonText: {
      color: theme.colors.black,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};

const ConnectStreamApp = ({ navigation }: OnboardingScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const services = [
    {
      name: "Apple Music",
      logo: "https://res.cloudinary.com/drda29q8x/image/upload/v1661291908/logos/spotify-logo-png-7061_tmgb84.png",
    },
    {
      name: "Spotify",
      logo: "https://res.cloudinary.com/drda29q8x/image/upload/v1661291908/logos/spotify-logo-png-7061_tmgb84.png",
    },
    {
      name: "Google Play Music",
      logo: "https://res.cloudinary.com/drda29q8x/image/upload/v1661291908/logos/spotify-logo-png-7061_tmgb84.png",
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/drda29q8x/image/upload/v1676158144/logos/Group_88_qxl6bc.png",
        }}
        style={{ width: 100, height: 100 }}
      />

      <Text style={styles.mainText}>Connect to your streaming service</Text>
      <Text style={styles.supportingText}>
        Connect your streaming account and discover new music personalized to
        your taste.{" "}
      </Text>
      <View style={styles.buttonContainer}>
        {services.map((service) => (
          <Service
            key={service.name}
            serviceName={service.name}
            logoUrl={service.logo}
          />
        ))}
      </View>
      <TouchableHighlight
        onPress={() => navigation.navigate("SelectFavouriteGenres")}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Connect</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ConnectStreamApp;
