import { VStack } from "native-base";
import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ViewStyle,
} from "react-native";
import useTheme from "../../hooks/useTheme";

export interface Choice {
  label: string;
  votes: number;
}

export interface ChoiceWithPercentage extends Choice {
  percentage: number;
}

export interface PollOptionProps extends ChoiceWithPercentage {
  onPress: () => void;
  optionStyle?: ViewStyle;
  progressStyle?: ViewStyle;
  height?: number;
  activeBackgroundColor?: string;
}

type PollOptions = {
  label: string;
  id?: string;
  votes: number;
  total: number;
  count: number;
  hasVoted: boolean;
  onChoiceSelect: (label: string, id?: string | number) => void;
};

const PollOption = ({
  count,
  total,
  label,
  hasVoted = false,
  onChoiceSelect,
  id,
}: PollOptions) => {
  const theme = useTheme();
  const [animation] = useState(new Animated.Value(0));
  const percentage = useMemo(() => (count / total) * 100, [count]);
  const BORDER_RADIUS = 10;
  const BOX_HEIGHT = 50;
  useEffect(() => {
    if (hasVoted) {
      console.log("start animation");
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [hasVoted]);

  const handlePress = (label: string, id?: string | number) => {
    onChoiceSelect(label, id);
  };

  const animatedStyles = {
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [`0%`, `${percentage}%`],
    }),
  };

  const renderUnVotedOption = () => {
    return (
      <TouchableOpacity onPress={() => handlePress(label, id)}>
        <View
          style={{
            borderRadius: 30,
            borderWidth: 2,
            borderColor: theme.colors.brand,
            height: BOX_HEIGHT,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: theme.colors.brand, fontWeight: "bold" }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderVotedOption = () => {
    return (
      <View
        style={{
          position: "relative",
          flexDirection: "row-reverse",
          paddingLeft: 10,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.darkGrey,
            paddingRight: 10,
            width: "100%",
            height: BOX_HEIGHT,
            borderRadius: BORDER_RADIUS,
          }}
        >
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              width: "100%",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                position: "absolute",
                top: 20,
                zIndex: 1,
              }}
            >
              {percentage.toFixed(2)}%
            </Text>
          </View>
        </View>
        <Animated.View
          style={[
            {
              backgroundColor: theme.colors.brand,
              width: "40%",
              height: BOX_HEIGHT,
              position: "absolute",
              paddingLeft: 10,
              right: 0,
              borderTopLeftRadius: BORDER_RADIUS,
              borderBottomLeftRadius: BORDER_RADIUS,
            },
            animatedStyles,
          ]}
        />
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            width: "100%",
            paddingLeft: 10,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              position: "absolute",
              paddingLeft: 10,
              zIndex: 1,
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    );
  };

  return !hasVoted ? renderUnVotedOption() : renderVotedOption();
};

interface PollProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  optionStyle?: ViewStyle;
  progressStyle?: ViewStyle;
  activeBackgroundColor?: string;
}

const Poll: React.FC<PollProps> = ({ choices, onChoiceSelect }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const totalVotes = choices.reduce((acc, choice) => acc + choice.votes, 0);

  useEffect(() => {
    if (hasVoted) {
      setTimeout(() => {
        setHasVoted(false);
      }, 5000);
    }
  }, [hasVoted]);

  const handleChoiceSelect = (label: string) => {
    const choiceIndex = choices.findIndex((choice) => choice.label === label);
    const choice = choices[choiceIndex];
    if (!choice) return;
    choice.votes += 1;
    choices[choiceIndex] = choice;
    onChoiceSelect(choice);
    if (!hasVoted) setHasVoted(true);
  };
  return (
    <VStack style={[styles.container, { width: "auto" }]}>
      {choices.map(({ label, votes }, index) => (
        <View style={{ flex: 1, marginBottom: 10 }}>
          <PollOption
            key={index}
            onChoiceSelect={handleChoiceSelect}
            total={totalVotes}
            count={votes}
            hasVoted={hasVoted}
            label={label}
            votes={votes}
          />
        </View>
      ))}
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  option: {
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  labelWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressBar: {
    flex: 2,
    height: "100%",
    backgroundColor: "#red",
  },
  progress: {
    height: "100%",
  },
  percentage: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
  },
  div: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "auto",
    height: 50,
  },
});
export default Poll;
