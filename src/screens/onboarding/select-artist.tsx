import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView, Text } from "native-base";
import { useAuth } from "../../hooks/useAuth";
import useArtistList from "../../hooks/useArtists";

import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../hooks/useTheme";
import ArtistThumbnail from "../../components/artistThumbnail";
import { OnboardingScreenProps } from "../../interfaces";

interface Genre {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Artist {
  id: number;
  name: string;
  bio: string;
  image: string;
  created_at: string;
  updated_at: string;
  genres: Genre[];
}

const FavouriteArtistsPage = (props: OnboardingScreenProps) => {
  const {
    state: { streamingHistory, user },
    callbacks: { setOnboardingStatus },
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
  const { artists, handleSearch, fetchArtists, addFavoriteArtist, loading } =
    useArtistList(false);
  const theme = useTheme();

  useEffect(() => {
    if (artists.length && streamingHistory) {
      const { favouriteArtists } = streamingHistory;
      const selectedArtist = artists.filter((artist) => {
        return (
          favouriteArtists?.items.some((fave) => fave.name === artist.name) &&
          !selectedArtists.some((sel) => sel.name === artist.name)
        );
      });
      setSelectedArtists((prev) => [...prev, ...selectedArtist]);
    }
  }, [artists]);

  useEffect(() => {
    const query = {
      searchQuery: "",
      limit: 50,
      page: 1,
    };
    if (streamingHistory) {
      console.log("Streaming history", streamingHistory.favouriteArtists);
      let searchString: string[] | string =
        streamingHistory.favouriteArtists?.items?.map(({ name }) => name) || [];
      if (searchString.length) {
        query.searchQuery = searchString.join(",");
      }
    }
    fetchArtists(query);
  }, []);

  const handleArtistSelect = (artist: Artist): void => {
    const isAlreadySelected: boolean = selectedArtists.some(
      (selectedArtist) => selectedArtist.id === artist.id
    );
    if (isAlreadySelected) {
      setSelectedArtists(
        selectedArtists.filter(
          (selectedArtist) => selectedArtist.id !== artist.id
        )
      );
    } else {
      setSelectedArtists([...selectedArtists, artist]);
    }
  };

  const renderArtistThumbnail = ({ item }: { item: Artist }): JSX.Element => (
    <ArtistThumbnail
      artist={{ name: item.name, thumbnailUrl: item.image, id: item.id }}
      onPress={() => handleArtistSelect(item)}
      isSelected={selectedArtists.some(
        (selectedArtist) => selectedArtist.id === item.id
      )}
    />
  );

  const isNextButtonVisible = selectedArtists.length > 0;

  return (
    <>
      <StatusBar backgroundColor={theme.colors.darkGrey} />
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="ios-search" size={20} color="#777" />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for artists..."
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        <View style={styles.selectedArtistsContainer}>
          {selectedArtists.length ? (
            <ScrollView horizontal>
              {selectedArtists.map((artist) => (
                <Image
                  key={artist.id}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 100,
                  }}
                  source={{ uri: artist.image }}
                />
              ))}
            </ScrollView>
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: 18,
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Select Your Favourite Artists
            </Text>
          )}
        </View>
        <FlatList
          data={artists?.filter((artist) =>
            artist.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => `${item.id}`}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginVertical: 10,
          }}
          renderItem={renderArtistThumbnail}
          numColumns={3}
          contentContainerStyle={styles.artistThumbnailsContainer}
        />
        {isNextButtonVisible && (
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: theme.colors.brand, borderRadius: 50 },
            ]}
            onPress={async () => {
              try {
                if (!user) return;
                await addFavoriteArtist(
                  user.id,
                  selectedArtists.map((selected) => selected.id)
                );
                props.navigation.navigate("SelectFavouriteGenres");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text style={styles.nextButtonText}>
              {loading ? "Loading" : "Continue"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "black",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "black",
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
  },
  artistThumbnailsContainer: {
    flexGrow: 1,
    paddingTop: 10,
  },
  selectedArtistsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginBottom: 50,
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  nextButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FavouriteArtistsPage;
