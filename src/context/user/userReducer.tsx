import { User, UserLoginResponse } from "@/interfaces/user/userLogin";

export interface UserState {
  user: User;
  loading: boolean;
}

export type UserAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

export const initialState: UserState = {
  user: {
    userDocument: "",
    email: "",
    names: "",
    lastNames: "",
    isActive: false,
    areas: [],
    roles: [],
    isOnline: false,
  },
  loading: true,
};

export function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: initialState.user, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }

  // switch (action.type) {
  //   case "LOGIN":
  //     const payload = action.payload.data;
  //     return {
  //       userDocument: payload.userDocument,
  //       email: payload.email,
  //       names: payload.names,
  //       lastNames: payload.lastNames,
  //       isActive: payload.isActive,
  //       areas: payload.areas,
  //       roles: payload.roles,
  //     };
  //   case "LOGOUT":
  //     return initialState;
  //   default:
  //     return state;
  // }
}
