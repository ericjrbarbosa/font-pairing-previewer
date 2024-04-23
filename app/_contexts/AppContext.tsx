"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { FontPair } from "@/app/types";

type AppContext = {
  fontPairs: FontPair[];
  saveFontPair: (fontPair: FontPair) => void;
  removeFontPair: (index: number) => void;
  clearFontPairs: () => void;
};

export const AppContext = createContext<AppContext | null>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [fontPairs, setFontPairs] = useState<FontPair[]>([]);

  const saveFontPair = (fontPair: FontPair) => {
    if (
      fontPairs.find(
        (_fontPair) =>
          _fontPair.primary.family === fontPair.primary.family &&
          _fontPair.secondary.family === fontPair.secondary.family
      )
    )
      return;

    setFontPairs((prevFontPairs) => [...prevFontPairs, fontPair]);
  };

  const removeFontPair = (index: number) => {
    setFontPairs((prevFontPairs) =>
      prevFontPairs.filter(
        (_fontPair, _currentIndex) => _currentIndex !== index
      )
    );
  };

  const clearFontPairs = () => setFontPairs([]);

  const value = { fontPairs, saveFontPair, removeFontPair, clearFontPairs };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
