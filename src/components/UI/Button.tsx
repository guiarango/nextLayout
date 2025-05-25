"use client";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
