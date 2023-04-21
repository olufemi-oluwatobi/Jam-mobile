import React from "react";
import useTheme from "../../../../hooks/useTheme";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableHighlight,
} from "react-native";
import { useAuth } from "../../../../hooks/useAuth";
import { Avatar, HStack, VStack, Button } from "native-base";
import { MainScreenProps } from "../../../../interfaces";

const FollowerButton = ({ isFollower }: { isFollower: boolean }) => {
  const { colors } = useTheme();

  return (
    <Button
      style={{
        borderRadius: 100,
        marginTop: 20,
        paddingHorizontal: 50,
        borderWidth: 1,
        borderColor: colors.grey,
        backgroundColor: isFollower ? colors.primary : "transparent",
      }}
      color="black"
    >
      {isFollower ? "Following" : "Follow"}
    </Button>
  );
};

const BioSection = ({
  navigation,
  isUser,
}: MainScreenProps & { isUser?: boolean }) => {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const {
    state: { user },
  } = useAuth();

  return (
    <VStack style={styles.container}>
      <HStack style={{ alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Avatar
            rounded="full"
            size={"100px"}
            style={{ borderWidth: 1, borderColor: "#666" }}
            source={{ uri: "https://picsum.photos/200" }}
          />
        </View>
        <VStack style={{ alignItems: "flex-end", paddingTop: 20 }}>
          <HStack>
            <VStack style={styles.row}>
              <Text style={styles.value}>7 days</Text>
              <Text style={styles.label}>Streak</Text>
            </VStack>
            <TouchableHighlight
              onPress={() => navigation.navigate("Following")}
            >
              <VStack style={styles.row}>
                <Text style={styles.value}>1,234</Text>
                <Text style={styles.label}>Followers</Text>
              </VStack>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => navigation.navigate("Following")}
            >
              <VStack style={styles.row}>
                <Text style={styles.value}>567</Text>
                <Text style={styles.label}>Following</Text>
              </VStack>
            </TouchableHighlight>
          </HStack>
          <View>
            {!isUser ? (
              <FollowerButton isFollower={true} />
            ) : (
              <TouchableHighlight
                style={{
                  borderWidth: 1,
                  borderColor: "#666",
                  marginTop: 20,
                  borderRadius: 100,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Text
                  style={{ fontSize: 12, color: "white", fontWeight: "bold" }}
                >
                  Edit Profile
                </Text>
              </TouchableHighlight>
            )}
          </View>
        </VStack>
      </HStack>
      <VStack
        alignItems="flex-start"
        style={{ width, paddingLeft: 10, marginTop: 10 }}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "800" }}>
          Identical
        </Text>
        <Text style={{ fontSize: 16, color: theme.colors.grey }}>
          @identical
        </Text>
      </VStack>
      <HStack
        style={{
          marginVertical: 20,
          width,
          paddingLeft: 30,
          alignItems: "center",
        }}
      >
        <Avatar.Group
          _avatar={{
            size: "sm",
          }}
          max={3}
        >
          <Avatar
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            AJ
          </Avatar>
          <Avatar
            source={{
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          >
            TE
          </Avatar>
          <Avatar
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
            marginHorizontal: 10,
            marginRight: 50,
            textAlign: "left",
            fontSize: 16,
          }}
        >
          followed by olaitan, markus and marque 50 others
        </Text>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    top: 0,
    zIndex: 100,
  },

  row: {
    marginLeft: 20,
    alignItems: "center",
  },
  label: {
    marginTop: 2,
    fontSize: 14,
    color: "#fff",
    textAlignVertical: "center",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlignVertical: "center",
  },
});

export default BioSection;
