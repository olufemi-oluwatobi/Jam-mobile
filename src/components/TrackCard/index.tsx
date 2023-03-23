import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TrackCardProps {
  name: string;
  artist: string;
  image: string;
  rating: number;
  style?: StyleProp<ViewStyle>;
}

const TrackCard: React.FC<TrackCardProps> = ({
  name,
  artist,
  image,
  rating,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        {/* <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
        </View> */}
        <TouchableHighlight style={styles.moreContainer}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#B0B0B0" />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginBottom: 2,
  },
  artist: {
    fontSize: 14,
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    color: "white",
  },
  moreContainer: {
    marginLeft: 10,
  },
});

export default TrackCard;
