import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import DateTimePicker, {
  BaseProps,
} from "@react-native-community/datetimepicker";
import { Theme } from "../../../styles/theme";
import useTheme from "../../../hooks/useTheme";

interface InputProps extends BaseProps {
  label: string;
  error?: string | false | null | undefined;
  mode?: "date" | "time" | "datetime";
}

const DatePicker: React.FC<InputProps> = (props) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const { label, error, mode, ...rest } = props;
  const styles = createStyles(theme);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <DateTimePicker
        mode={mode}
        {...rest}
        customStyles={{
          dateInput: { flexGrow: 1 },
        }}
        style={{ flex: 1, borderColor: "red", borderWidth: 1 }}
      />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
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
      marginBottom: 15,
    },
  });
};

export default DatePicker;
