import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
};

const Segment: React.FC<Props> = ({ text, data, onSeeAllPress }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[styles.text, { fontSize: 24, color: theme.colors.white }]}
        >
          {text}
        </Text>
        {onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={[styles.text, { color: theme.colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(({ type, data, variant }) => (
          <View style={{ marginRight: 30 }} key={data.id}>
            {type === "persona" ? (
              <PersonaCard
                image={data.image}
                variant={variant}
                text={data.name}
              />
            ) : (
              <RecordCard
                recordName={data.name}
                recordCreator={data.creator}
                image={data.image}
                variant={variant}
                // date={data.date}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  text: {
    fontWeight: "bold",
  },
});

export default Segment;
