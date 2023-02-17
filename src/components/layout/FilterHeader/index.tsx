import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import useTheme from "../../../hooks/useTheme";

type Filter = {
  text: string;
  key: string;
  onPress: (d: Filter) => void;
};

type Props = {
  filters: Filter[];
  defaultColor: string;
  activeColor: string;
  activeFilter: string;
};

const FilterHeader: React.FC<Props> = ({
  filters,
  defaultColor,
  activeColor,
  activeFilter,
}) => {
  const theme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -70],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }], backgroundColor: theme.colors.black },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={() =>
          Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })
        }
      >
        {filters.map(({ key, ...filter }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  activeFilter === key ? activeColor : defaultColor,
              },
            ]}
            onPress={() => {
              filter.onPress({ ...filter, key });
            }}
          >
            <Text
              style={[
                styles.filterButtonText,
                {
                  color: activeFilter !== key ? "white" : "black",
                },
              ]}
            >
              {filter.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonText: {
    fontSize: 16,
  },
});

export default FilterHeader;
