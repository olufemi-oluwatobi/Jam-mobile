import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Theme } from "../../../styles/theme";
import useTheme from "../../../hooks/useTheme";

interface InputProps extends TextInputProps {
  label: string;
}

const Input: React.FC<InputProps> = (props) => {
  const theme = useTheme();
  const { label, ...rest } = props;
  const styles = createStyles(theme);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.colors.grey}
        {...rest}
        style={styles.input}
      />
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    inputContainer: {
      marginBottom: 10,
    },
    inputLabel: {
      color: theme.colors.white,
      marginBottom: 10,
      fontSize: 16,
    },
    input: {
      backgroundColor: theme.colors.darkGrey,
      color: theme.colors.white,
      padding: 10,
      height: 53,
      borderRadius: 5,
      marginBottom: 15,
    },
  });
};

export default Input;
