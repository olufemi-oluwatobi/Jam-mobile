import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface PlaylistCardProps {
  image: string;
  name: string;
  likes: number;
  score: number;
}

const PlaylistCard = ({ image, name, likes, score }: PlaylistCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.likes}>Likes: {likes}</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  likes: {
    marginTop: 5,
  },
  score: {
    marginTop: 5,
  },
});

export default PlaylistCard;
