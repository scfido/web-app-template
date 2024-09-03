"use client";

import { cn } from "@/lib/utils";
import { useThemeConfigStore } from "./themeConfigStore";
import { useAppearance } from "./AppearanceContext";

export interface IThemeWrapperProps extends React.HtmlHTMLAttributes<HTMLDivElement>{
  defaultTheme?: string;
}

function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: IThemeWrapperProps) {
  const { appearance } = useAppearance();
  const config = useThemeConfigStore();

  const currentAppearance = appearance === "dark" ? "dark" : "light";

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
    "--radius": `${defaultTheme ? "0.5" : config.cssVars.light.radius}rem`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "bg-background text-foreground",
        `theme-${defaultTheme || config.theme}`,
        "w-full",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default ThemeWrapper
