import React, { useState } from "react";
import { Toast, View } from "native-base";
import { StyleSheet } from "react-native";
import useTheme from "../../../../hooks/useTheme";
import { Image, Box, Text, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export type ImagePickerResult = {
  cancelled: boolean;
  height?: number;
  type?: "image" | "video";
  uri?: string;
  width?: number;
  fileUri?: string;
};

const EditAvatar = ({ avatar }: { avatar: string }) => {
  const theme = useTheme();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Toast.show({ title: "Permission to access camera roll is required!" });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleImagePick}>
        <Image
          alt="image"
          source={{ uri: selectedImage || avatar }}
          style={styles.image}
        />

        {selectedImage && (
          <View style={styles.overlay}>
            <MaterialIcons name="edit" size={24} color="white" />
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "black",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 50,
  },
});

export default EditAvatar;
