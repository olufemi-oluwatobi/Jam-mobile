// import React, { useState, useContext } from "react";
// import { View, Switch, useColorScheme } from "react-native";
// import { Dimensions } from "react-native";
// import { ThemeType, Breakpoint } from "./theme";

// export const ThemeContext = React.createContext<ThemeType>({});

// const getBreakpointForScreenSize = ({
//   theme,
// }: {
//   theme: ThemeType;
// }) => {
//   const dimensions = Dimensions.get("window");
//   const sortedBreakpoints = Object.entries(theme.breakpoints).sort(
//     (valA, valB) => valA[1] - valB[1]
//   );

//   return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]) => {
//     if (dimensions.width >= minWidth) return breakpoint;
//     return acc;
//   }, "") as keyof Breakpoint;
// };

// const getResponsiveValue = ({
//   value,
//   theme,
// }: {
//   value: Breakpoint | keyof Breakpoint;
//   theme: ThemeType;
// }): any => {
//   if (typeof value === "object") {
//     return value[getBreakpointForScreenSize({ theme })];
//   }
//   return value;
// };
