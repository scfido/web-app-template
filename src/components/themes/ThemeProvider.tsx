"use client";

import { cn } from "@/lib/utils";
import { useThemeConfigStore, useThemeConfigStore1, useThemeConfigStore2 } from "./themeConfigStore";
import { useAppearance } from "./AppearanceContext";
import { Theme } from "./themes";
import { Slot } from '@radix-ui/react-slot';

export interface IThemeProviderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ThemeProvider = ({
  children,
  className,
}: IThemeProviderProps) => {
  const { appearance } = useAppearance();
  const config = useThemeConfigStore();

  const currentAppearance = appearance === "dark" ? "dark" : "light";

  // 将配置文件中的css变量转换为style属性
  const prefixedCssVars = Object.keys(config.cssVars[currentAppearance]).reduce(
    (acc, key) => {
      const value =
        config.cssVars[currentAppearance as keyof typeof config.cssVars][
        key as keyof (typeof config.cssVars)["light"]
        ];
      acc[`--${key}`] = value !== undefined ? `${value}` : "";
      return acc;
    },
    {} as Record<string, string>
  );

  const style = {
    ...prefixedCssVars,
  } as React.CSSProperties;

  return (
    <div 
      className={cn(
        "bg-background text-foreground",
        `theme-${config.theme}`,
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default ThemeProvider
