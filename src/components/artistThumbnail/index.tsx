import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import useTheme from "../../hooks/useTheme";

interface Artist {
  id: number | string;
  name: string;
  thumbnailUrl: string;
}

interface Props {
  artist: Artist;
  onPress?: () => void;
  isSelected: boolean;
}

const numColumns = 3; // Change this to the number of columns you want
const screenWidth = Dimensions.get("window").width;
const avatarSize = (screenWidth - (numColumns + 1) * 16) / numColumns;

const ArtistThumbnail = ({ artist, onPress, isSelected }: Props) => {
  const { colors } = useTheme();
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={[styles.thumbnail, { width: avatarSize, height: avatarSize }]}
          source={{ uri: artist.thumbnailUrl }}
        />
        <Text style={styles.artistName} numberOfLines={2} ellipsizeMode="tail">
          {artist.name}
        </Text>
        {isSelected && <View style={styles.overlay} />}
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <View
              style={{ ...styles.checkmark, backgroundColor: colors.brand }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  thumbnail: {
    borderRadius: avatarSize / 2,
  },
  artistName: {
    marginTop: 8,
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    maxWidth: avatarSize,
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  checkmarkContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: avatarSize / 3,
    height: avatarSize / 3,
    borderRadius: avatarSize / 3 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    width: avatarSize / 5,
    height: avatarSize / 5,
    borderRadius: avatarSize / 5 / 2,
    backgroundColor: "white",
  },
});

export default ArtistThumbnail;
