"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [unReadMessageCount, setUnReadMessageCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{ unReadMessageCount, setUnReadMessageCount }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
