"use client";

import { cn } from "@/lib/utils";
import { ICssVars, ITheme, IThemeCssVars, themes } from "./themes";
import { createContext, CSSProperties, useContext, useEffect, useState } from "react";
import { useCookieState } from "ahooks";
import type { AppearanceType } from ".";
import { usePrefersColorScheme } from "@/lib/usePrefersColorScheme";
import { Slot } from "@radix-ui/react-slot";

const getThemeCssVars = (themeName: string): IThemeCssVars => {
  const theme = themes.find((theme) => theme.name === themeName) ?? themes[0];
  return theme.cssVars
}

const getSystemAppearance = () => {
  // 判断是服务端还是客户端
  if (typeof window === "undefined")
    return "light"

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  return mediaQuery.matches ? "dark" : "light"
}

const getAppearanceValue = (appearance?: string) => {
  switch (appearance) {
    case "system":
      return getSystemAppearance()
    case "dark":
      return "dark"
    default:
      return "light"
  }
}

const getThemeStyle = (themeCssVars: IThemeCssVars, appearance: AppearanceType): CSSProperties => {
  const cssVars = themeCssVars[getAppearanceValue(appearance)]

  // 将配置文件中的css变量转换为style属性
  const prefixedCssVars = Object.keys(cssVars).reduce(
    (acc, key) => {
      const value = cssVars[key as keyof (typeof cssVars)];
      acc[`--${key}`] = value !== undefined ? `${value}` : "";
      return acc;
    },
    {} as Record<string, string>
  );

  const style = {
    ...prefixedCssVars,
  } as React.CSSProperties;

  return style
}

export interface IThemeProviderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultTheme?: ITheme["name"];
  defaultAppearance?: AppearanceType;
  asChild?: boolean;
}

interface IThemeProviderState {
  themeName: ITheme["name"] | undefined;
  appearance: AppearanceType;
  themeCssVars: IThemeCssVars;
  setThemeName: (themeName: ITheme["name"]) => void;
  setAppearance: (appearance: AppearanceType) => void;
  setThemeCssVars: (cssVars: IThemeCssVars) => void;
  resetThemeCssVars: () => void;
}

const initialState: IThemeProviderState = {
  themeName: "zinc",
  appearance: "system",
  themeCssVars: getThemeCssVars("zinc"),
  setThemeName: () => null,
  setAppearance: () => null,
  setThemeCssVars: () => null,
  resetThemeCssVars: () => null,
}

const ThemeProviderContext = createContext<IThemeProviderState>(initialState)

const ThemeProvider = ({
  children,
  className,
  defaultTheme = initialState.themeName,
  defaultAppearance = initialState.appearance,
  asChild,
}: IThemeProviderProps) => {
  const prefersColorScheme = usePrefersColorScheme({ ssr: true })
  const [themeName, setThemeName] = useCookieState(ThemeProvider.themeCookieName, { defaultValue: defaultTheme })
  const [appearance, setAppearance] = useCookieState(ThemeProvider.appearanceCookieName, { defaultValue: defaultAppearance ?? prefersColorScheme })
  const [themeCssVars, setThemeCssVars] = useState<IThemeCssVars>(getThemeCssVars(themeName as ITheme["name"]))

  const value: IThemeProviderState = {
    appearance: appearance as AppearanceType,
    themeName: themeName as ITheme["name"],
    themeCssVars: themeCssVars,
    setAppearance: (appearance: AppearanceType) => {
      // 外观写入到cookie
      setAppearance(appearance)
    },
    setThemeName: (themeName: ITheme["name"]) => {
      // 主题写入到cookie
      setThemeName(themeName)
    },
    setThemeCssVars: (cssVars: IThemeCssVars) => {
      setThemeCssVars(cssVars)
    },
    resetThemeCssVars: () => {
      setThemeCssVars(getThemeCssVars(themeName as ITheme["name"]))
    }
  }

  useEffect(() => {
    setThemeCssVars(getThemeCssVars(themeName as ITheme["name"]))
  }, [themeName])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (appearance === "dark" || appearance === "light") {
      root.classList.add(appearance)
    }
    else if (appearance === "system") {
      root.classList.add(prefersColorScheme)
    }

  }, [appearance, prefersColorScheme])

  const Comp = asChild ? Slot : 'div';

  return (
    <ThemeProviderContext.Provider value={value}>
      <Comp
        className={cn(
          "bg-background text-foreground",
          `theme-${themeName}`,
          className
        )}
        style={getThemeStyle(themeCssVars, appearance as AppearanceType)}
      >
        {children}
      </Comp>
    </ThemeProviderContext.Provider>
  );
}

ThemeProvider.displayName = "ThemeProvider"
ThemeProvider.appearanceCookieName = "app_appearance"
ThemeProvider.themeCookieName = "app_theme"

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

export default ThemeProvider
