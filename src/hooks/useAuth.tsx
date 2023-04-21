import { useContext } from "react";
import { useQueryClient, useMutation, UseMutateFunction } from "react-query";
import axios, { AxiosError } from "axios";
import Constants from "expo-constants";
import { User } from "../contexts/auth";
import { BASE_URL } from "../constants";
import { AuthContext, Token } from "../contexts/auth";

interface LoginData {
  user: User;
  token: Token;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  email: string;
}

interface LogoutResult {
  logout: () => void;
}

// const BASE_URL = "https://da0d-41-184-51-49.eu.ngrok.io/api/v1"; //Constants?.manifest?.extra?.BASE_URL;
// useAuth hook
// Returns the state from the AuthContext
const useAuth = () => {
  const { state, dispatch, callbacks } = useContext(AuthContext);
  return { state, dispatch, callbacks };
};

// useRegister hook
// Returns a useMutation hook to make a post request to the 'https://employee.free.beeceptor.com/create' endpoint with the RegisterPayload data and dispatches an action of type 'SIGN_UP_COMPLETE' upon success with the user data and token
const useRegister = (): {
  registerUser: UseMutateFunction<LoginData, any, RegisterPayload>;
  isLoading: boolean;
  error: any;
} => {
  const { state, dispatch } = useContext(AuthContext);
  // Throws an error if the hook is not used within a AuthProvider
  if (!state) {
    throw new Error("useLogin must be used within a AuthProvider");
  }

  // Function to make a post request to the 'https://employee.free.beeceptor.com/create' endpoint with the RegisterPayload data
  const register = async (data: LoginPayload) => {
    try {
      const url = `${BASE_URL}/auth/register`;
      const { data: response } = await axios.post(`${url}`, data);
      return response;
    } catch (error: any) {
      console.log(error);
    }
  };

  // Gets a reference to the queryClient
  const queryClient = useQueryClient();

  // useMutation hook to make the post request and handle success, error, and settled events
  const { mutate, isLoading, error } = useMutation<
    LoginData,
    any,
    RegisterPayload
  >(register, {
    onSuccess: (data) => {
      if (!data) return;
      // Dispatches an action of type 'SIGN_UP_COMPLETE' with the user data and token upon success
      dispatch({
        type: "SIGN_UP_COMPLETE",
        payload: { user: data.user, token: data.token },
      });
    },
    onError: () => {},
    onSettled: () => {
      // Invalidates the create query in the queryClient
      queryClient.invalidateQueries("create");
    },
  });

  // Returns the mutate function, isLoading, and error from the useMutation hook
  return {
    registerUser: mutate,
    isLoading,
    error,
  };
};

// useLogin hook
// Returns a useMutation hook to make a post request to the 'https://employee.free.beeceptor.com/create' endpoint with the LoginPayload data and dispatches an action of type 'LOGIN_COMPLETE' upon success with the user data

const useLogin = (): {
  login: UseMutateFunction<LoginData, any, LoginPayload>;
  isLoading: boolean;
  error: any;
} => {
  const { state, dispatch } = useContext(AuthContext);
  if (!state) {
    throw new Error("useLogin must be used within a AuthProvider");
  }

  const baseUrl = Constants?.manifest?.extra?.BASE_URL;

  const login = async (data: LoginPayload) => {
    const { data: response } = await axios.post(`${BASE_URL}/auth/login`, data);
    console.log(response);
    return response;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation<
    LoginData,
    any,
    LoginPayload
  >(login, {
    onSuccess: (data) => {
      dispatch({
        type: "LOGIN_COMPLETE",
        payload: { user: data.user, token: data.token },
      });
    },
    onError: () => {},
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  return {
    login: mutate,
    isLoading,
    error,
  };
};

const useUserInformation = (): {
  getUserData: UseMutateFunction<LoginData, any, LoginPayload>;
  isLoading: boolean;
  error: any;
} => {
  const { state, dispatch } = useContext(AuthContext);
  if (!state) {
    throw new Error("useLogin must be used within a AuthProvider");
  }

  const baseUrl = Constants?.manifest?.extra?.BASE_URL;

  const login = async () => {
    const { data: response } = await axios.get(`${BASE_URL}/auth/me`);
    console.log(response);
    return response;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation<LoginData, any, any>(login, {
    onSuccess: (data) => {
      dispatch({
        type: "LOGIN_COMPLETE",
        payload: { user: data.user, token: data.token },
      });
    },
    onError: () => {},
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  return {
    getUserData: mutate,
    isLoading,
    error,
  };
};

// useLogout hook
// Returns an object with a logout function which dispatches an action of type 'LOGOUT'
const useLogout = (): LogoutResult => {
  // Gets the dispatch method from the AuthContext
  const { dispatch } = useContext(AuthContext);
  // Throws an error if the hook is not used within a AuthProvider
  if (!dispatch) {
    throw new Error("useLogout must be used within a AuthProvider");
  }

  // Logout function which dispatches an action of type 'LOGOUT'
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Returns the logout function
  return { logout };
};

export { useLogin, useLogout, useRegister, useAuth, useUserInformation };
