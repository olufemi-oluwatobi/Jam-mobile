import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as WebBrowser from "expo-web-browser";
import { useFirebase } from "../useFirebase";
import axios from "axios";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useAuth } from "../useAuth";
import { BASE_URL } from "../../constants";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = "85db21cafa7f47698d86d3232f9d30d6";
const REDIRECT_URI = "exp://localhost:19000/--/";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export function useSpotify() {
  const [token, setToken] = useState(null);
  const {
    state: { token: authToken },
    dispatch,
  } = useAuth();
  const [user, setUser] = useState(null);
  const { registerAction } = useFirebase();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const subscription = registerNotifications();
    return () => subscription.remove();
  }, []);

  const registerNotifications = () => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification", notification);
        // Check if the notification contains the data payload with the closeBrowser action
        if (notification.request.content.data.action === "closeBrowser") {
          // Open the browser and close the login modal
        }
      }
    );
    return subscription;
  };

  const handleAuth = async () => {
    await promptAsync();
  };

  const fetchUserSpotifyData = async (code: string) => {
    if (!code) return;
    try {
      const { data } = await axios.post(
        `${BASE_URL}/streamservices/register`,
        {
          code: code,
          redirect_uri: REDIRECT_URI,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken?.token}`,
          },
        }
      );
      dispatch({
        type: "UPDATE_STREAMING_HISTORY",
        payload: { streamingHistory: data },
      });
    } catch (error) {
      console.log("ERROR HER", error);
    }
    // setToken(data.access_token);
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "playlist-read-private",
        "user-follow-modify",
        "user-read-recently-played",
        "user-top-read",
        "ugc-image-upload",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: REDIRECT_URI,
    },
    discovery
  );

  useEffect(() => {
    console.log("checking response", console.log(response));
    if (response?.type === "success") {
      console.log(response.params);
      const { code } = response.params;
      dispatch({
        type: "STORE_STREAM_SERVICE_META",
        payload: {
          streamServiceMeta: {
            serviceName: "spotify",
            accessCode: code,
          },
        },
      });
      fetchUserSpotifyData(code);
    }
  }, [response]);

  async function getUserData() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  }

  return { token, user, isVisible, handleAuth: handleAuth, getUserData };
}
