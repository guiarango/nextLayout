import { useContext } from "react";
import { UserContext, UserContextType } from "@/context/user/userContext";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
