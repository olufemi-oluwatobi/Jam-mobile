import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import useTheme from "../../hooks/useTheme";

type Props = {
  image: string;
  variant: "md" | "lg" | "xl";
  text: string;
};

const PersonaDisplay: React.FC<Props> = ({ image, variant, text }) => {
  const theme = useTheme();

  const sizes = {
    lg: 60,
    xl: 80,
    md: 40,
  };
  const size = sizes[variant];

  const width = size;
  const height = size;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={{ width, height, borderRadius: 50 }}
      />
      <Text style={[styles.text, { color: theme.colors.grey }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    marginTop: 16,
  },
});

export default PersonaDisplay;
