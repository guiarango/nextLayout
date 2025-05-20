"use client";
import { User } from "@/interfaces/user/userLogin";
import { createContext } from "react";
import { UserAction } from "./userReducer";

type UserContextType = {
  state: User;
  dispatch: React.Dispatch<UserAction>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
