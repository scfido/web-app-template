import ThemeProvider from "./ThemeProvider";
import { ITheme } from "./themes";

type ColorSchemeType = 'light' | 'dark';
type AppearanceType = ColorSchemeType | "system"

export {
    ThemeProvider
};
export type {
    AppearanceType,
    ColorSchemeType,
    ITheme
};
