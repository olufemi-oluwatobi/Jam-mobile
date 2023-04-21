import React from "react";
import { StyleSheet } from "react-native";
import {
  FormControl,
  Input,
  IFormControlProps,
  IInputProps,
  Text,
  View,
} from "native-base";

interface InputFieldProps extends IFormControlProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string | false | null | undefined;
  isMultiline?: boolean;
  inputProps?: IInputProps;
  secureTextEntry?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  error,
  isMultiline = false,
  inputProps,
  placeholder,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <FormControl isInvalid={Boolean(error)} {...props}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Input
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        multiline={isMultiline}
        {...inputProps}
      />
      {error ? (
        <FormControl.ErrorMessage>
          <Text style={styles.error}>{error}</Text>
        </FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 8,
  },
  error: {
    color: "red",
  },
});

export default InputField;
