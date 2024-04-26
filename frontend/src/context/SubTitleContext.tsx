import React, { createContext, useState, ReactNode } from "react";

interface SubTitleContextProps {
  subTitle: string;
  setSubTitle: (subTitle: string) => void;
}

export const SubTitleContext = createContext<SubTitleContextProps>({
  subTitle: "",
  setSubTitle: () => {},
});

interface SubTitleProviderProps {
  children: ReactNode;
}

export const SubTitleProvider = ({ children }: SubTitleProviderProps) => {
  const [subTitle, setSubTitle] = useState("");

  return (
    <SubTitleContext.Provider value={{ subTitle, setSubTitle }}>
      {children}
    </SubTitleContext.Provider>
  );
};
