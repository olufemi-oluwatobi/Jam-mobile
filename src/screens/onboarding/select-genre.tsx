import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { OnboardingScreenProps } from "../../interfaces";
import { Svg, Path } from "react-native-svg";
import { Progress, VStack } from "native-base";
import { Theme } from "../../styles/theme";
import useTheme from "../../hooks/useTheme";

const Genre = ({
  genreName,
  size,
  selected,
  onPress,
}: {
  genreName: string;
  size: number;
  selected: boolean;
  onPress: () => void;
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    genreButton: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      padding: 15,
      paddingHorizontal: 30,
      marginRight: 20,
      marginTop: 10,
      borderRadius: 50,
      height: 50,
      borderWidth: 1,
      borderColor: selected ? "none" : theme.colors.brand,
      backgroundColor: selected ? theme.colors.white : "transparent",
    },
    genreText: {
      fontSize: 14,
      color: selected ? theme.colors.black : theme.colors.white,
      fontWeight: "bold",
    },
    genreIcon: {
      height: 20,
      width: 20,
      marginRight: 10,
    },
  });

  return (
    <TouchableOpacity style={styles.genreButton} onPress={onPress}>
      <Text style={styles.genreText}>{genreName}</Text>
    </TouchableOpacity>
  );
};

const SelectFavouriteGenres = (props: OnboardingScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "Jazz",
    "Classical",
    "Metal",
    "Blues",
    "Country",
    "Electronic",
    "Reggae",
    "Latin",
    "R&B",
    "Soul",
    "Folk",
    "World Music",
    "Alternative",
    "Rap",
    "Punk",
  ];

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePress = (genreName: string) => {
    const genreIndex = selectedGenres.indexOf(genreName);
    if (genreIndex !== -1) {
      setSelectedGenres([
        ...selectedGenres.slice(0, genreIndex),
        ...selectedGenres.slice(genreIndex + 1),
      ]);
    } else {
      setSelectedGenres([...selectedGenres, genreName]);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ padding: 20, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/drda29q8x/image/upload/v1676158144/logos/Group_88_qxl6bc.png",
          }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.mainText}>Connect to your streaming service</Text>
        <Text style={styles.supportingText}>
          Connect your streaming account and discover new music personalized to
          your taste.
        </Text>
      </View>
      <VStack style={{ width, paddingLeft: 20 }} alignItems="center">
        <ScrollView
          onScroll={(event) =>
            setScrollPosition(event.nativeEvent.contentOffset.x)
          }
          scrollEventThrottle={16}
          contentContainerStyle={styles.genresList}
          horizontal={true}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
        >
          {genres.map((item, index) => (
            <Genre
              key={index}
              genreName={item}
              size={100}
              selected={selectedGenres.includes(item)}
              onPress={() => handlePress(item)}
            />
          ))}
        </ScrollView>
        <Progress
          bg={"#21333D"}
          _filledTrack={{
            bg: theme.colors.white,
          }}
          style={{
            width: width - 40,
            height: 5,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
          }}
          value={scrollPosition}
        />
      </VStack>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SelectFavouriteArtists")}
          style={styles.mainButton}
        >
          <Text style={styles.mainButtonText}>Next</Text>
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#07171F",
    },
    icon: {
      width: 50,
      height: 50,
    },
    mainText: {
      fontSize: 22,
      marginTop: 20,
      color: theme.colors.white,
      textAlign: "center",
      fontWeight: "bold",
    },
    supportingText: {
      fontSize: 14,
      marginTop: 20,
      fontWeight: "bold",
      color: theme.colors.white,
      textAlign: "center",
    },
    genresList: {
      flexDirection: "row",
      height: 300,
      flexWrap: "wrap",
      width: Dimensions.get("window").width + 200,
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 20,
    },
    progessWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: Dimensions.get("window").width,
      margin: 20,
      height: 10,
      bottom: 0,
      position: "absolute",
    },
    mainButton: {
      backgroundColor: theme.colors.brand,
      padding: 10,
      paddingHorizontal: 40,
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
  });

export default SelectFavouriteGenres;
