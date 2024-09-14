"use client";

import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { Theme, CssVars, themes } from "./themes";

interface IThemeConfig {
  theme: Theme["name"];
  cssVars: {
    light: Partial<CssVars["light"]>;
    dark: Partial<CssVars["dark"]>;
  };
  setConfig: (config: Partial<IThemeConfig>) => void;
};

const useThemeConfigStore = create<IThemeConfig, [["zustand/persist", IThemeConfig]]>(
  persist(
    (set) => ({
      theme: "zinc",
      cssVars: {
        light: (themes.find((theme) => theme.name === "zinc")
          ?.cssVars
          .light as unknown as Partial<CssVars["light"]>) || {},
        dark: (themes.find((theme) => theme.name === "zinc")
          ?.cssVars
          .dark as unknown as Partial<CssVars["dark"]>) || {},
      },
      setConfig: (config: Partial<IThemeConfig>) => set(state => ({ ...state, ...config })),
    }),
    {
      name: "system-ui-theme", // 存储的名称，必须是唯一的
    })
)

export { useThemeConfigStore }
