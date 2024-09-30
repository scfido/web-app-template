"use client";

import { cn } from "@/lib/utils";
import { ITheme, IThemeCssVars, themes } from "./themes";
import { createContext, CSSProperties, useContext, useEffect, useState } from "react";
import { useCookieState } from "ahooks";
import type { AppearanceType, ColorSchemeType } from ".";
import { usePrefersColorScheme } from "@/lib/usePrefersColorScheme";
import { Slot } from "@radix-ui/react-slot";

const getThemeCssVars = (themeName: string): IThemeCssVars => {
  const theme = themes.find((theme) => theme.name === themeName) ?? themes[0];
  return theme.cssVars
}

const getThemeStyle = (themeCssVars: IThemeCssVars, colorScheme: ColorSchemeType): CSSProperties => {
  const cssVars = themeCssVars[colorScheme]

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
  themeName: ITheme["name"];
  /** 设置的外观 */
  appearance: AppearanceType;
  /** 当前的外观 */
  colorScheme: ColorSchemeType;
  themeCssVars: IThemeCssVars;
  getTheme: (themeName: ITheme["name"]) => ITheme;
  setThemeName: (themeName: ITheme["name"]) => void;
  setAppearance: (appearance: AppearanceType) => void;
  setThemeCssVars: (cssVars: IThemeCssVars) => void;
  resetThemeCssVars: () => void;
}

const initialState: IThemeProviderState = {
  themeName: "zinc",
  appearance: "system",
  colorScheme: "light",
  themeCssVars: getThemeCssVars("zinc"),
  getTheme: () => { throw new Error("not implemented") },
  setThemeName: () => { throw new Error("not implemented") },
  setAppearance: () => { throw new Error("not implemented") },
  setThemeCssVars: () => { throw new Error("not implemented") },
  resetThemeCssVars: () => { throw new Error("not implemented") },
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

const ThemeProviderContext = createContext<IThemeProviderState>(initialState)

const ThemeProvider = ({
  children,
  className,
  defaultTheme = initialState.themeName,
  defaultAppearance = initialState.appearance,
  asChild,
}: IThemeProviderProps) => {
  const prefersColorScheme = usePrefersColorScheme(defaultAppearance === "system" ? undefined : defaultAppearance)
  const [themeName, setThemeName] = useCookieState(ThemeProvider.themeCookieName, { defaultValue: defaultTheme })
  const [appearance, setAppearance] = useCookieState(ThemeProvider.appearanceCookieName, { defaultValue: defaultAppearance })
  const [_systemColorScheme, setSystemColorScheme] = useCookieState(ThemeProvider.prefersColorSchemeCookieName, { defaultValue: prefersColorScheme })
  const [colorScheme, setColorScheme] = useState<ColorSchemeType>(
    (appearance === "light" || appearance === "dark") ? appearance : prefersColorScheme
  )

  const [themeCssVars, setThemeCssVars] = useState<IThemeCssVars>(getThemeCssVars(themeName as ITheme["name"]))

  const value: IThemeProviderState = {
    appearance: appearance as AppearanceType,
    colorScheme: colorScheme,
    themeName: themeName as ITheme["name"],
    themeCssVars: themeCssVars,
    getTheme: (themeName: ITheme["name"]) => {
      const theme = themes.find((theme) => theme.name === themeName)
      if (!theme)
        throw new Error(`theme not found: ${themeName}`)

      return theme
    },
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
    let colorScheme: ColorSchemeType
    if (appearance === "system") {
      colorScheme = prefersColorScheme
    } else {
      colorScheme = appearance === "dark" ? "dark" : "light"
    }
    setColorScheme(colorScheme)
    setSystemColorScheme(prefersColorScheme)

    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(colorScheme)

  }, [appearance, prefersColorScheme])

  useEffect(() => {
    setThemeCssVars(getThemeCssVars(themeName as ITheme["name"]))
  }, [themeName])

  const Comp = asChild ? Slot : 'div';

  return (
    <ThemeProviderContext.Provider value={value}>
      <Comp
        className={cn(
          "bg-background text-foreground",
          `theme-${themeName}`,
          className
        )}
        style={getThemeStyle(themeCssVars, colorScheme)}
      >
        {children}
      </Comp>
    </ThemeProviderContext.Provider>
  );
}

ThemeProvider.displayName = "ThemeProvider"
ThemeProvider.appearanceCookieName = "app_appearance"
ThemeProvider.themeCookieName = "app_theme"
ThemeProvider.prefersColorSchemeCookieName = "app_prefers_color_scheme"
export default ThemeProvider
