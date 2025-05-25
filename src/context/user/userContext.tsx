"use client";
import { createContext } from "react";
import { UserAction, UserState } from "./userReducer";

export type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
