import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { CheckIcon, Paintbrush } from "lucide-react"
import ThemeProvider from "./ThemeProvider"
import { cn } from "@/lib/utils"
import React from "react"
import CustomizerHeader from "./customizer/CustomizerHeader"
import ColorSection from "./customizer/CustomizerColor"
import RadiusSection from "./customizer/CustomizerRadius"
import AppearanceSection from "./customizer/CustomizerAppearance"
import ColorPickerSection from "./customizer/ColorPickerSection"
import { useThemeConfigStore } from "./themeConfigStore"
import { useAppearance } from "./AppearanceContext"
import { Skeleton } from "../ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { themes } from "./themes"
import { CopyCodeButton } from "./customizer/CopyCodeButton"



const Customizer = ({ className }: { className?: string }) => {
  return (
    <ThemeProvider
      defaultTheme="zinc"
      className={cn(
        "fixed inset-y-0 right-0 flex flex-col md:min-h-[95vh]  p-4 space-y-4 overflow-y-scroll border-2 rounded-md shadow-sm scroll-y-auto backdrop-blur-sm bg-white/80 dark:bg-black/80 md:space-y-6",
        className
      )}
    >
      <CustomizerHeader />
      <div className="flex flex-col flex-1 gap-4 md:gap-6">
        <ColorSection />
        <RadiusSection />
        <AppearanceSection />
        <ColorPickerSection />
        <CopyCodeButton />
      </div>
    </ThemeProvider>
  );
}

export interface IThemeCustomizerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const ThemeCustomizer = (
  {
    className,
    ...props

  }: IThemeCustomizerProps
) => {
  const setConfig = useThemeConfigStore(state => state.setConfig);
  const themeColor = useThemeConfigStore(state => state.theme)
  const { appearance } = useAppearance();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div {...props} className={cn("flex items-center space-x-2", className)} >
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Paintbrush className="w-4 h-4 mr-2" />
            定制
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[85%] p-6 pt-10">
          <DrawerTitle>定制主题</DrawerTitle>
          <DrawerDescription>定制颜色和外观</DrawerDescription>
          <Customizer />
        </DrawerContent>
      </Drawer>
      <div className="hidden md:flex">
        <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
          {mounted ? (
            <>
              {["zinc", "rose", "blue", "green", "orange"].map((color) => {
                const theme = themes.find((theme) => theme.name === color);
                const isActive = themeColor === color;

                if (!theme) {
                  return null;
                }

                return (
                  <Tooltip key={theme.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          setConfig({
                            theme: theme.name,
                            cssVars: theme.cssVars as any,
                          })
                        }
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                          isActive
                            ? "border-[--theme-primary]"
                            : "border-transparent"
                        )}
                        style={
                          {
                            "--theme-primary": `hsl(${theme?.activeColor[
                              appearance === "dark" ? "dark" : "light"
                            ]
                              })`,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                          )}
                        >
                          {isActive && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </span>
                        <span className="sr-only">{theme.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
                    >
                      {theme.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </>
          ) : (
            <div className="flex items-center mr-1 space-x-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          )}
        </div>
        <Popover>
          <PopoverTrigger className="hidden md:flex" asChild>
            <Button variant="outline">
              <Paintbrush className="h-4 mr-2" />
              定制
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-40 w-[30rem] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
          >
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default ThemeCustomizer