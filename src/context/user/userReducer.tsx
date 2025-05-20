import { User, UserLoginResponse } from "@/interfaces/user/userLogin";

export type UserAction =
  | { type: "LOGOUT" }
  | { type: "LOGIN"; payload: UserLoginResponse };

export const initialState: User = {
  userDocument: "",
  email: "",
  names: "",
  lastNames: "",
  isActive: false,
  areas: [],
  roles: [],
};

export function userReducer(state: User, action: UserAction) {
  switch (action.type) {
    case "LOGIN":
      const payload = action.payload.data;

      return {
        userDocument: payload.userDocument,
        email: payload.email,
        names: payload.names,
        lastNames: payload.lastNames,
        isActive: payload.isActive,
        areas: payload.areas,
        roles: payload.roles,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
