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
  error?: string | false | null | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const theme = useTheme();
  const { label, error, ...rest } = props;
  const styles = createStyles(theme);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.colors.grey}
        {...rest}
        style={styles.input}
      />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      color: theme.colors.white,
      marginBottom: 10,
      fontSize: 16,
    },
    errorMessage: {
      color: theme.colors.danger,
      fontSize: 14,
      marginTop: 5,
    },
    input: {
      backgroundColor: theme.colors.darkGrey,
      color: theme.colors.white,
      padding: 10,
      height: 53,
      borderRadius: 5,
    },
  });
};

export default Input;
