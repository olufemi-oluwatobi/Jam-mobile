import { useContext } from "react";
import { Theme } from "../../styles/theme";
import { ThemeContext } from "../../styles/provider";

const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
