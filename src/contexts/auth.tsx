import React, { useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

interface State {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  token: string | null;
}

interface Action {
  type:
    | "LOGIN_COMPLETE"
    | "SIGN_UP_COMPLETE"
    | "ONBOARDING_COMPLETE"
    | "LOGOUT";
  payload?: {
    user?: User;
    token?: string;
    error?: string;
  };
}

const initialState: State = {
  isLoading: false,
  error: null,
  user: null,
  token: null,
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

interface AuthContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue
);

// Function to store data in local storage
export const storeData = async (key: string, value: { [k: string]: any }) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing data: ${error}`);
  }
};

// Function to retrieve data from local storage
export const retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      //   dispatch({ type: "LOGIN_COMPLETE", payload: { token: data.token } });
    }
    return null;
  } catch (error) {
    console.error(`Error retrieving data: ${error}`);
  }
};

// Function to delete data from local storage
export const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting data: ${error}`);
  }
};

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const retrieveData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log("value", value);
      if (value !== null) {
        const data = JSON.parse(value);
        dispatch({ type: "LOGIN_COMPLETE", payload: data });
      }
      return null;
    } catch (error) {
      console.error(`Error retrieving data: ${error}`);
    }
  };

  useEffect(() => {
    retrieveData(AUTH_TOKEN_STORAGE_NAME);
  }, []);
  useEffect(() => {
    if (state.token) {
      console.log("Data stored");
      storeData(AUTH_TOKEN_STORAGE_NAME, state);
    } else {
      deleteData(AUTH_TOKEN_STORAGE_NAME);
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
