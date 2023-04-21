import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import useGenre, { Genre } from "../../hooks/useGenre";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { OnboardingScreenProps } from "../../interfaces";
import { useAuth } from "../../hooks/useAuth";
import { Svg, Path } from "react-native-svg";
import { Progress, VStack } from "native-base";
import { Theme } from "../../styles/theme";
import useTheme from "../../hooks/useTheme";
import { BASE_URL } from "../../constants";

const numGenrePerRow = (size: number) => {
  const screenWidth = Dimensions.get("window").width;
  const maxNumGenres = Math.floor(screenWidth / size);
  const actualSize = screenWidth / maxNumGenres;
  return { numPerRow: maxNumGenres, size: actualSize };
};

const GenreComponent = ({
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
    <TouchableHighlight style={styles.genreButton} onPress={onPress}>
      <Text style={styles.genreText}>{genreName}</Text>
    </TouchableHighlight>
  );
};

const SelectFavouriteGenres = (props: OnboardingScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [isLoading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const {
    state: { streamingHistory, user, token: authToken },
    callbacks: { setOnboardingStatus },
  } = useAuth();

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { genres: fullGenreData } = useGenre();
  const [{ lastIndex, genres }, setLoadedGenres] = useState(() => ({
    lastIndex: 200,
    genres: [...fullGenreData].splice(0, 20),
  }));
  const { numPerRow, size } = numGenrePerRow(10);

  const genreWrapperWidth = size * genres.length;

  const storeFavouriteGenre = async () => {
    try {
      const genreId = selectedGenres.map((genre) => genre.id);
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/users/${user?.id}/favourite_genre`,
        {
          genreId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken?.token}`,
          },
        }
      );
      setOnboardingStatus(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let favouriteGenre: Genre[] = [];
    if (fullGenreData.length) {
      let data = streamingHistory?.favouriteArtists.items.map(
        (item) => item.genres
      );
      if (data) {
        const d = data.flat(1);
        favouriteGenre = fullGenreData.filter((item) => d.includes(item.name));
      }

      const returnData = _.unionBy(
        favouriteGenre,
        [...fullGenreData].splice(0, 200),
        "name"
      );

      setSelectedGenres((selectedGenre) => [
        ...selectedGenre,
        ...favouriteGenre,
      ]);

      setLoadedGenres({
        lastIndex: 200,
        genres: [...returnData].splice(0, 200),
      });
    }
  }, [fullGenreData]);

  const loadMore = () => {
    const newLastIndex = lastIndex * 2;
    const newGenres = [
      ...genres,
      ...fullGenreData.slice(lastIndex, newLastIndex),
    ];
    setLoadedGenres({ lastIndex: newLastIndex, genres: newGenres });
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handlePress = (genreName: string) => {
    const genreIndex = selectedGenres.findIndex(
      (genre) => genre.name === genreName
    );
    if (genreIndex !== -1) {
      setSelectedGenres([
        ...selectedGenres.slice(0, genreIndex),
        ...selectedGenres.slice(genreIndex + 1),
      ]);
    } else {
      const genre = genres.find((genre) => genre.name === genreName);
      if (!genre) return;
      setSelectedGenres((selected) => [...selected, genre]);
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
          onScroll={(event) => {
            setScrollPosition(event.nativeEvent.contentOffset.x);
            console.log(event.nativeEvent.contentOffset.x);
          }}
          scrollEventThrottle={16}
          contentContainerStyle={[
            styles.genresList,
            { width: genreWrapperWidth },
          ]}
          horizontal={true}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          // onEndReached={() => loadMore()}
          // onEndReachedThreshold={0}
          // onMomentumScrollEnd={() => loadMore()}
          // onEndReachedThreshold={0.5}
        >
          {genres.map((item, index) => (
            <GenreComponent
              key={item.name}
              genreName={item.name}
              size={100}
              selected={selectedGenres.some(
                (selectedGenre) => selectedGenre.name === item.name
              )}
              onPress={() => handlePress(item.name)}
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
        <TouchableHighlight
          onPress={async () => storeFavouriteGenre()}
          style={styles.mainButton}
        >
          <View>
            <Text style={styles.mainButtonText}>
              {!isLoading ? "Next" : "Loading"}
            </Text>
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
          </View>
        </TouchableHighlight>
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
