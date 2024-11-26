"use client";

import { TUser } from "@/types";
import React, { createContext, useContext, ReactNode } from "react";

const UserContext = createContext<TUser | null>(null);

interface UserProviderProps {
  children: ReactNode;
  value: TUser;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  value,
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): TUser => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
