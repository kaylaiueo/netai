"use client";

import { createContext, useState } from "react";

type ReplyType = {
  active: boolean;
  ref: string;
  to: string;
  deep?: boolean;
};

type ContextType = {
  reply: ReplyType;
  setReply: React.Dispatch<React.SetStateAction<ReplyType>>;
};

export const GlobalContext = createContext({} as ContextType);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [reply, setReply] = useState<ReplyType>({
    active: false,
    ref: "",
    to: "",
    deep: false,
  });

  return (
    <GlobalContext.Provider value={{ reply, setReply }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
