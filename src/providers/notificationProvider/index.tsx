import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

interface NotificationContextType {
  registerForPushNotificationsAsync: () => Promise<string>;
  pushToken?: string;
}

const NotificationContext = createContext<NotificationContextType>({
  registerForPushNotificationsAsync: async () => "",
});

export const useNotification = () => useContext(NotificationContext);

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string>("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  const registerForPushNotificationsAsync = async (): Promise<string> => {
    let token = "";

    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return "";
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    return token;
  };

  return (
    <NotificationContext.Provider
      value={{ registerForPushNotificationsAsync, pushToken: expoPushToken }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
