import React, { useEffect, useReducer } from "react";
import { format, parseISO, isPast } from "date-fns";
import axios from "axios";
import {
  retrieveData,
  storeData,
  deleteData,
} from "../helpers/handleAsyncStorageActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constants";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  display_name?: string | null;
  avatar?: string | null;
  bio?: string | null;
  phone_number?: string | null;
  role_id: number;
  social_id?: string | null;
  provider?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StreamingData {
  trackHistory: {
    name: string;
    artist: string;
    album: string;
    datePlayed: string;
  }[];
  playlists: {
    name: string;
    description: string;
    tracks: {
      name: string;
      artist: string;
      album: string;
    }[];
  }[];
  metadata: {
    name: string;
    email: string;
    country: string;
  };
  favouriteArtists: {
    href: string;
    items: {
      name: string;
      followers: number;
      genres: string[];
    }[];
  };
  favoriteTracks: {
    name: string;
    artist: string;
    album: string;
  }[];
}

export type Token = { expires_at: string; token: string; type: string };

export type StreamServiceMeta = {
  serviceName: string;
  accessCode: string;
};
interface State {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  isOnboarded: boolean;
  streamingHistory: null | StreamingData;
  token: Token | null;
  streamServiceMeta: StreamServiceMeta[] | null;
}

interface Action {
  type:
    | "LOGIN_COMPLETE"
    | "SIGN_UP_COMPLETE"
    | "ONBOARDING_COMPLETE"
    | "LOGOUT"
    | "UPDATE_STREAMING_HISTORY"
    | "STORE_STREAM_SERVICE_META"
    | "UPDATE_ONBOARDING_STATUS";

  payload?: {
    user?: User;
    token?: Token;
    error?: string;
    streamingHistory?: any;
    streamServiceMeta?: StreamServiceMeta;
    isOnboarded?: boolean;
  };
}

const initialState: State = {
  isLoading: false,
  error: null,
  user: null,
  streamingHistory: null,
  token: null,
  streamServiceMeta: null,
  isOnboarded: false,
};

const AUTH_TOKEN_STORAGE_NAME = "@JAM_AUTH_TOKEN";

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN_COMPLETE":
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
      };
    case "UPDATE_STREAMING_HISTORY":
      console.log("UPDATE_STREAMING_HISTORY", action.payload?.streamingHistory);
      return {
        ...state,
        streamingHistory: action.payload?.streamingHistory || null,
      };

    case "UPDATE_ONBOARDING_STATUS":
      return {
        ...state,
        isOnboarded: action.payload?.isOnboarded || false,
      };

    case "STORE_STREAM_SERVICE_META":
      console.log("STORE META DATA");
      return {
        ...state,
        streamServiceMeta: state.streamServiceMeta
          ? [
              ...state.streamServiceMeta,
              action?.payload?.streamServiceMeta as StreamServiceMeta,
            ]
          : [action?.payload?.streamServiceMeta as StreamServiceMeta] || null,
      };
    case "SIGN_UP_COMPLETE":
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

type Callbacks = {
  setOnboardingStatus: (status: boolean) => void;
};

interface AuthContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
  callbacks: Callbacks;
}

const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue
);

const STREAM_SERVICE_METADATA = "STREAM_SERVICE_METADATA";
const STREAMING_HISTORY = "STREAMING_HISTORY";
const ONBOARDING_STATUS_HISTORY = "ONBOARDING_STATUS_HISTORY";

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storeStreamServiceMetaData = async () => {
      AsyncStorage.setItem(
        STREAM_SERVICE_METADATA,
        JSON.stringify(state.streamServiceMeta || null)
      );
    };
    storeStreamServiceMetaData();
  }, [state.streamServiceMeta]);

  useEffect(() => {
    if (state.streamingHistory) {
      storeData(STREAMING_HISTORY, state.streamingHistory);
    }
  }, [state.streamingHistory]);

  const setOnboardingStatus = (
    status: boolean,
    storeInLocalStorage: boolean = true
  ) => {
    console.log(status);
    if (storeInLocalStorage) {
      storeData(ONBOARDING_STATUS_HISTORY, { isOnboarded: status });
    }
    dispatch({
      type: "UPDATE_ONBOARDING_STATUS",
      payload: { isOnboarded: status },
    });
  };
  const hydrateStreamingHistoryState = async () => {
    const streamingServiceMetadata = await retrieveData(
      STREAM_SERVICE_METADATA
    );
    const streamingHistory = await retrieveData(STREAMING_HISTORY);
    const onboardingStatus = await retrieveData(ONBOARDING_STATUS_HISTORY);
    if (streamingServiceMetadata) {
      dispatch({
        type: "STORE_STREAM_SERVICE_META",
        payload: streamingServiceMetadata,
      });
    }
    if (onboardingStatus) {
      setOnboardingStatus(onboardingStatus.isOnboarded, false);
    }
    if (streamingHistory) {
      dispatch({
        type: "UPDATE_STREAMING_HISTORY",
        payload: streamingHistory,
      });
    }
  };

  const getUserInformation = async () => {
    try {
      const { token: authToken } = state;
      const response = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const retrieveAuthData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const data = JSON.parse(value);
        let expiry = data?.token?.expires_at;
        expiry = parseISO(expiry);
        const hasExpired = isPast(expiry);
        if (hasExpired) {
          deleteData(AUTH_TOKEN_STORAGE_NAME);
          dispatch({ type: "LOGOUT" });
          return null;
        }
        dispatch({ type: "LOGIN_COMPLETE", payload: data });
        getUserInformation();
      }
      return null;
    } catch (error) {
      console.error(`Error retrieving data: ${error}`);
    }
  };

  useEffect(() => {
    hydrateStreamingHistoryState();
    retrieveAuthData(AUTH_TOKEN_STORAGE_NAME);
  }, []);
  useEffect(() => {
    if (state.token) {
      storeData(AUTH_TOKEN_STORAGE_NAME, state);
    } else {
      deleteData(AUTH_TOKEN_STORAGE_NAME);
    }
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{ state, dispatch, callbacks: { setOnboardingStatus } }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
