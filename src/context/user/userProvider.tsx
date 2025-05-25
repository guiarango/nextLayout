"use client";
import { ApiLocalService } from "@/services/apiLocal.service";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useReducer } from "react";
import { UserContext } from "./userContext";
import { initialState, userReducer } from "./userReducer";
import { UserLoginResponseData } from "@/interfaces/user/userLogin";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const router = useRouter();
  const pathname = usePathname();
  const apiLocalService = new ApiLocalService();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiLocalService.post("/api/me", {});

        if (response.ok) {
          const userData = response.data as UserLoginResponseData;
          dispatch({
            type: "SET_USER",
            payload: {
              areas: userData.areas,
              email: userData.email,
              isActive: userData.isActive,
              lastNames: userData.lastNames,
              names: userData.names,
              roles: userData.roles,
              userDocument: userData.userDocument,
              isOnline: true,
            },
          });
          if (pathname === "/auth") {
            router.push("/");
          }
        } else {
          dispatch({ type: "LOGOUT" });
          router.push("/auth");
        }
      } catch (error) {
        dispatch({ type: "LOGOUT" });
        router.push("/auth");
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
