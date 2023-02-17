interface Palette {
  purple: string;
  green: string;
  red: string;
  black: string;
  darkGrey: string;
  grey: string;
  white: string;
  brand: string;
}

interface Color extends Palette {
  background: string;
  foreground: string;
  primary: string;
  success: string;
  danger: string;
  failure: string;
}

export type Spacing = {
  s: number;
  m: number;
  l: number;
  xl: number;
};

export type Breakpoint = {
  smallPhone: number;
  phone: number;
  tablet: number;
};

export type TextVariant = {
  header: {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
  };
  body: {
    fontFamily: string;
    fontSize: number;
  };
};

export type Theme = {
  colors: Color;
  spacing: Spacing;
  breakpoints: Breakpoint;
  textVariants: TextVariant;
};

const palette = {
  purple: "#5A31F4",
  green: "#0ECD9D",
  red: "#CD0E61",
  black: "#1A1423",
  darkGrey: "#2A272D",
  grey: "#B7B7B7",
  white: "#F0F2F3",
  brand: "#DBBBF5",
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    ...palette,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },

  breakpoints: {
    smallPhone: 0,
    phone: 321,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontFamily: "Raleway",
      fontSize: 36,
      fontWeight: "bold",
    },
    body: {
      fontFamily: "Merriweather",
      fontSize: 16,
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  },
};

export type ThemeType = typeof theme;
