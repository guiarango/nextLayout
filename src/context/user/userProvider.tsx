"use client";
import { ReactNode, useCallback, useEffect, useReducer } from "react";
import { initialState, userReducer } from "./userReducer";
import { UserContext } from "./userContext";
import { ApiService } from "@/services/api.service";
import {
  UserLoginResponse,
  UserLoginResponseData,
} from "@/interfaces/user/userLogin";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const apiService = new ApiService();

  const getUser = async (): Promise<UserLoginResponse> => {
    const response = await apiService.get("/auth/returnUserInfo");
    return response.data as UserLoginResponse;
  };

  const fetchUser = async () => {
    const user = await getUser();
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
