import React from "react";
import { useColorScheme } from "react-native";
import { theme, darkTheme, Theme } from "./theme";

export const ThemeContext = React.createContext<Theme>(theme);

const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const colorScheme = useColorScheme();
  return (
    <ThemeContext.Provider value={colorScheme === "dark" ? darkTheme : theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
