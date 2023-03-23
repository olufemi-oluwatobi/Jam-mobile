import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ViewStyle,
  TextStyle,
} from "react-native";

import ActivityList from "../activityCard";
import useTheme from "../../hooks/useTheme";
import PersonaCard from "../PersonaCard";
import RecordCard from "../RecordCard";

export type SegmentData = {
  type: "persona" | "record";
  data: any;
  variant: "md" | "lg" | "xl";
};

type Props = {
  text: string;
  data: SegmentData[];
  onSeeAllPress?: () => void;
  onItemPress?: (d: SegmentData) => void;
  style?: {
    wrapperStyle?: ViewStyle;
    headerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    contentStyle?: ViewStyle;
  };
};

const Segment: React.FC<Props> = ({
  text,
  data,
  style,
  onSeeAllPress,
  onItemPress,
}) => {
  const theme = useTheme();

  const segStyles = {
    wrapperStyle: style?.wrapperStyle || {},
    headerStyle: style?.headerStyle || {},
    contentStyle: style?.contentStyle || {},
    labelStyle: style?.labelStyle || {},
  };

  const { wrapperStyle, headerStyle, contentStyle, labelStyle } = segStyles;

  const renderComponent = useCallback(
    ({ type, data, variant }: SegmentData) => {
      const recordProps = {
        recordName: data.name,
        onItemPress: () => onItemPress && onItemPress({ type, data, variant }),
        recordCreator: data.creator,
        image: data.image,
        variant,
        style: { marginRight: 20 },
      };
      const personProps = {
        image: data.image,
        onItemPress: () => onItemPress && onItemPress({ type, data, variant }),
        style: { marginRight: 15 },
        variant,
        text: data.name,
      };
      const types = {
        persona: <PersonaCard {...personProps} />,
        record: <RecordCard {...recordProps} />,
      };
      return types[type];
    },
    [data]
  );

  return (
    <View style={[styles.container, wrapperStyle]}>
      <View style={[styles.header, headerStyle]}>
        <Text
          style={[
            styles.text,
            { fontSize: 24, color: theme.colors.white, ...labelStyle },
          ]}
        >
          {text}
        </Text>
        {onSeeAllPress && (
          <TouchableHighlight onPress={onSeeAllPress}>
            <Text style={[styles.text, { color: theme.colors.primary }]}>
              See All
            </Text>
          </TouchableHighlight>
        )}
      </View>
      <ScrollView
        style={[contentStyle, { paddingBottom: 30 }]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map(({ type, data, variant }) => (
          <View
            style={{
              marginRight: 10,
              paddingTop: type === "persona" ? 20 : 0,
            }}
            key={data.id}
          >
            {renderComponent({ type, data, variant })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
  },
});

export default Segment;
