import React, { useMemo } from "react";
import useTheme from "../../../hooks/useTheme";
import { ViewStyle, Animated, ViewProps, StyleProp } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import Ranking, { RankingOption } from "../../../components/rankingComponent";
import Poll, { Choice } from "../../../components/poll";
import { View, Progress, VStack, Text, Avatar, HStack } from "native-base";

interface Props {
  navigation: any;
}

interface Props extends ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AnimatedView: React.FC<Props> = ({ children, style, ...rest }) => {
  return (
    <Animated.View
      style={[{ borderWidth: 1, borderColor: "white" }, style]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};

type Question = {
  question: string;
  type: "multiple" | "ranking" | "poll";
  choices: (Choice | RankingOption)[];
};
const questions: Question[] = [
  {
    question: "What is your favorite color?",
    type: "multiple",
    choices: [
      { label: "Red", votes: 10 },
      { label: "Blue", votes: 5 },
      { label: "Green", votes: 2 },
      { label: "Yellow", votes: 3 },
    ],
  },
  {
    question: "What is your favorite color?",
    type: "ranking",
    choices: [
      { label: "Red", rank: 1, key: 1 },
      { label: "Blue", rank: 2, key: 2 },
      { label: "Green", rank: 3, key: 3 },
    ],
  },
];

const ActivityPage: React.FC<Props> = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = React.useState(1);
  const theme = useTheme();

  const currentQuestion = useMemo(() => questions[activeIndex], [activeIndex]);

  const choices: Choice[] = [
    { label: "Option 1", votes: 10 },
    { label: "Option 2", votes: 5 },
    { label: "Option 3", votes: 2 },
    { label: "Option 4", votes: 3 },
  ];

  return (
    <View
      style={{
        flex: 1,
        height,
        backgroundColor: "#000",
        flexDirection: "column",
      }}
    >
      <View style={{ height: 70, backgroundColor: "#000" }}></View>
      <VStack style={{ width, paddingHorizontal: 20 }}>
        <Progress
          rounded="3"
          bg={theme.colors.darkGrey}
          _filledTrack={{
            bg: theme.colors.brand,
            borderRadius: 2,
          }}
          value={35}
        />
        <Text style={{ color: theme.colors.white, fontSize: 16, marginTop: 5 }}>
          1 of 9 questions
        </Text>
      </VStack>
      <VStack
        style={{ width, paddingHorizontal: 20, marginTop: 100, height: 300 }}
      >
        <Text
          style={{
            color: theme.colors.white,
            fontSize: 24,
            textAlign: "left",
            marginBottom: 20,
          }}
        >
          {currentQuestion.question}
        </Text>
        {currentQuestion.type === "multiple" ? (
          <Poll
            onChoiceSelect={(choice) => console.log(choice, choice)}
            progressStyle={{ backgroundColor: theme.colors.darkGrey }}
            optionStyle={{ backgroundColor: "red" }}
            choices={currentQuestion.choices as Choice[]}
          />
        ) : (
          <Ranking options={currentQuestion.choices as RankingOption[]} />
        )}
      </VStack>
      <HStack
        style={{
          width,
          paddingHorizontal: 35,
        }}
      >
        <Avatar.Group
          style={{
            borderColor: theme.colors.black,
          }}
          _avatar={{
            size: "sm",
            borderColor: "red",
          }}
          max={3}
        >
          <Avatar
            style={{
              borderColor: theme.colors.black,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            AJ
          </Avatar>
          <Avatar
            style={{
              borderColor: theme.colors.black,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          >
            TE
          </Avatar>
          <Avatar
            style={{
              borderColor: theme.colors.black,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            JB
          </Avatar>
          <Avatar
            style={{
              borderColor: theme.colors.black,
            }}
            bg={theme.colors.brand}
            source={{
              uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          >
            TS
          </Avatar>
          <Avatar
            bg="green.500"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            AJ
          </Avatar>
          <Avatar
            bg="cyan.500"
            source={{
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          >
            TE
          </Avatar>
          <Avatar
            bg="indigo.500"
            source={{
              uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            JB
          </Avatar>
          <Avatar
            bg="amber.500"
            source={{
              uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          >
            TS
          </Avatar>
        </Avatar.Group>
        <Text
          style={{
            color: theme.colors.grey,
            textAlign: "left",
            marginRight: 25,
            marginLeft: 10,
            fontSize: 16,
          }}
        >
          olaitan, markus and marque 50 others, particpated in this poll
        </Text>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    color: "white",
  },
  tabLabel: {
    color: "white",
    fontSize: 12,
  },
  tabIndicator: {
    backgroundColor: "#333",
  },
});

export default ActivityPage;
