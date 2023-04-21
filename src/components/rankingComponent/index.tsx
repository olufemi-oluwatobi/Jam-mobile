import React, { useState } from "react";
import useTheme from "../../hooks/useTheme";
import { View, Text, TouchableHighlight } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

export interface RankingOption {
  key: string | number;
  label: string;
  rank: number;
}

interface RankingProps {
  options: RankingOption[];
}

const Ranking: React.FC<RankingProps> = ({ options }) => {
  const [rankedOptions, setRankedOptions] = useState(options);
  const theme = useTheme();

  const renderItem = ({ item, drag }: any) => {
    return (
      <TouchableHighlight
        style={{
          backgroundColor: theme.colors.brand,
          padding: 20,
          marginBottom: 20,
          borderRadius: 30,
        }}
        onPressIn={drag}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 10 }}>{item.rank}</Text>
          <Text>{item.label}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const onDragEnd = ({ data }: any) => {
    setRankedOptions(
      data.map((option: RankingOption, index: number) => ({
        ...option,
        rank: index + 1,
      }))
    );
  };

  const data = rankedOptions.map((option, index) => ({
    ...option,
    rank: index + 1,
  }));

  return (
    <DraggableFlatList
      data={data}
      renderItem={renderItem}
      onDragEnd={onDragEnd}
      keyExtractor={(item: RankingOption) => item.key as string}
    />
  );
};

export default Ranking;
