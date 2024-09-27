import React, { useState, useEffect } from "react";
import { useDebounce } from "ahooks";
import { Label } from "@/components/ui/label";
import { ICssVars, IThemeCssVars } from "../themes";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { hexToHSL, hslToHex } from "./color.utils";
import { PipetteIcon } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const ColorPickerSection = () => {
  const {
    appearance,
    setAppearance,
    themeCssVars,
    setThemeCssVars
  } = useTheme();
  const [colorInfo, setColorInfo] = useState<{
    value: string;
    key: keyof ICssVars;
  } | null>(null);
  const debouncedColorInfo = useDebounce(colorInfo, { wait: 300 });
  const appearanceValue: keyof IThemeCssVars = appearance === "dark" ? "dark" : "light"

// 获取前景色或背景色的字符串缩写，如果不包含就返回DEFAULT
function getColorAbbreviation(key: string) {
  if (key.endsWith("-foreground")) {
    return "fg";
  }
  else if(key.endsWith("-background")) {
    return "bg";
  }
  return "DEFAULT";
}


  function getColorBaseKey(key: string) {
    if (key.endsWith("-foreground")) {
      return key.slice(0, -"-foreground".length);
    }
    else if(key.endsWith("-background")) {
      return key.slice(0, -"-background".length);
    }
    return key;
  }

  function groupColorsByAppearance(themeCssVars: IThemeCssVars, appearanceValue: keyof IThemeCssVars | undefined) {
    if (!appearanceValue || typeof themeCssVars[appearanceValue] !== "object") {
      return {};
    }

    return Object.keys(themeCssVars[appearanceValue]).reduce<{
      [key: string]: string[];
    }>((acc, key) => {
      const baseKey = getColorBaseKey(key);
      acc[baseKey] = acc[baseKey] || [];
      acc[baseKey].push(key);
      return acc;
    }, {});
  }

  const handleColorChange =
    (key: keyof ICssVars) => (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget?.value) {
        setColorInfo({ value: e.currentTarget.value, key });
      }
    };

  useEffect(() => {
    if (debouncedColorInfo) {
      const { value, key } = debouncedColorInfo;
      const hsl = hexToHSL(value);
      const formattedHsl = `${hsl.h.toFixed(1)} ${hsl.s.toFixed(
        1
      )}% ${hsl.l.toFixed(1)}%`;


      if (appearanceValue) {
        setThemeCssVars({
          ...themeCssVars,
          [appearanceValue]: {
            ...themeCssVars[appearanceValue],
            [key]: formattedHsl,
          },
        });
      }
    }
  }, [debouncedColorInfo]);

  const getStyle = (
    key: keyof ICssVars,
    appearanceValue: keyof IThemeCssVars
  ): React.CSSProperties => {
    if (!appearanceValue) return {};
    return {
      "--theme-primary": `hsl(${themeCssVars[appearanceValue][key]})`
    } as React.CSSProperties;
  };

  const getValue = (key: keyof ICssVars, appearanceValue: keyof IThemeCssVars) => {
    return hslToHex(
      themeCssVars[appearanceValue][key] as string
    );
  };

  const groupedColors = groupColorsByAppearance(themeCssVars, appearanceValue);

  const organizeColors = () => {
    const singles: { [key: string]: string[] } = {};
    const pairs: { [key: string]: string[] } = {};

    Object.entries(groupedColors).forEach(([baseKey, keys]) => {
      if (baseKey === "radius") return;
      if (keys.length === 1) {
        singles[baseKey] = keys;
      } else {
        pairs[baseKey] = keys;
      }
    });

    return { singles, pairs };
  };

  const { singles, pairs } = organizeColors();

  const renderColors = (colors: { [key: string]: string[] }) => {
    return Object.entries(colors).map(([baseKey, keys]) => (
      <div
        key={baseKey}
        className="flex flex-col p-2 space-y-2 border rounded-md"
      >
        <Label className="text-sm font-medium">{baseKey}</Label>
        <div className="flex flex-row space-x-2">
          {keys.map((key) => {
            const hasPair = keys.length > 1;
            const ref = React.createRef<HTMLInputElement>();
            return (
              <div
                key={key}
                className={cn(
                  "flex flex-col w-full items-center justify-center gap-y-1.5",
                  hasPair && "gap-y-0"
                )}
              >
                <div
                  className={cn(
                    "relative w-full text-transparent transition-colors duration-200 hover:text-foreground dark:hover:text-foreground/70",
                    {
                      "hover:text-card dark:hover:text-card/70":
                        key === "card-foreground",
                      "hover:text-card-foreground dark:hover:text-card-foreground/70":
                        key === "card",
                      "hover:text-popover dark:hover:text-popover/70":
                        key === "popover-foreground",
                      "hover:text-popover-foreground dark:hover:text-popover-foreground/70":
                        key === "popover",
                      "hover:text-primary dark:hover:text-primary/70":
                        key === "primary-foreground",
                      "hover:text-primary-foreground dark:hover:text-primary-foreground/70":
                        key === "primary",
                      "hover:text-secondary dark:hover:text-secondary/70":
                        key === "secondary-foreground",
                      "hover:text-secondary-foreground dark:hover:text-secondary-foreground/70":
                        key === "secondary",
                      "hover:text-muted dark:hover:text-muted/70":
                        key === "muted-foreground",
                      "hover:text-muted-foreground dark:hover:text-muted-foreground/70":
                        key === "muted",
                      "hover:text-accent dark:hover:text-accent/70":
                        key === "accent-foreground",
                      "hover:text-accent-foreground dark:hover:text-accent-foreground/70":
                        key === "accent",
                      "hover:text-destructive dark:hover:text-destructive/70":
                        key === "destructive-foreground",
                      "hover:text-destructive-foreground dark:hover:text-destructive-foreground/70":
                        key === "destructive",
                      "hover:text-background dark:hover:text-background/70":
                        key === "foreground",
                    }
                  )}
                >
                  <Input
                    type="color"
                    key={key}
                    className={cn(
                      "p-1 rounded-full w-full",
                      `[&::-webkit-color-swatch]:p-0 `,
                      `[&::-webkit-color-swatch]:rounded-full`,
                      `[&::-webkit-color-swatch]:border-2`,
                      `[&::-webkit-color-swatch]:border-black/20`,
                      `dark:[&::-webkit-color-swatch]:border-white/20`,
                      `[&::-webkit-color-swatch-wrapper]:p-0 border-none`,
                      "cursor-pointer"
                    )}
                    style={getStyle(key as keyof ICssVars, appearanceValue)}
                    value={getValue(key as keyof ICssVars, appearanceValue)}
                    onChange={handleColorChange(key as keyof ICssVars)}
                    name={key}
                    ref={ref}
                  />
                  <PipetteIcon
                    size={18}
                    className="absolute top-[calc(50%-0.5rem)] left-[calc(50%-0.5rem)] cursor-pointer"
                    onClick={() => {
                      if (ref.current) {
                        ref.current.click();
                      }
                    }}
                  />
                </div>
                {hasPair && (
                  <label htmlFor={key} className="text-xs uppercase">
                    {getColorAbbreviation(key)}
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-xs">CSS Variables</Label>
      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
        {renderColors(pairs)}
        {renderColors(singles)}
      </div>
    </div>
  );
};

export default ColorPickerSection;
