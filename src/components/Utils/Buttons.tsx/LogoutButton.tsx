"use client";
import React, { FC } from "react";

import { useRouter } from "next/navigation";

import Button from "@/components/UI/Button";
import { useUser } from "@/hooks/useUser";
import { ApiLocalService } from "@/services/apiLocal.service";

interface Props {
  children: React.ReactNode;
}

const LogoutButton: FC<Props> = ({ children }) => {
  const { dispatch } = useUser();
  const apiLocalService = new ApiLocalService();
  const router = useRouter();

  const deleteRefreshToken = async () => {
    await apiLocalService.delete("/api/logout", {});

    dispatch({ type: "LOGOUT" });

    router.push("/auth");
  };

  return <Button onClick={deleteRefreshToken}>{children}</Button>;
};

export default LogoutButton;
