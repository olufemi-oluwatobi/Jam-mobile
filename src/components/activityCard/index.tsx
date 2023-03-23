import React from "react";
import { Avatar } from "native-base";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";

export type ActivityCardProps = {
  userName: string;
  action: string;
  week: string | number;
  avatar: string;
};

export const ActivityCard = ({
  userName,
  action,
  week,
  avatar,
}: ActivityCardProps) => {
  return (
    <View style={styles.activityCard}>
      <Avatar size={"sm"} source={{ uri: avatar }} />
      <View style={styles.activityDetails}>
        <Text style={styles.action}>
          {userName} {action}
        </Text>
      </View>
      <View>
        <Text style={styles.week}>{week}w</Text>
      </View>
    </View>
  );
};

export type ActivityListProps = {
  activities: ActivityCardProps[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {activities.map((activity, index) => (
        <ActivityCard {...activity} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  activityDetails: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  action: {
    marginTop: 2,
    color: "#fff",
  },
  week: {
    color: "#999",
  },
});

export default ActivityList;
