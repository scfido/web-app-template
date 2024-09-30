import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { Fragment } from "react";
import template from "lodash.template";
import { ITheme, IThemeCssVars } from "../themes";
import ThemeProvider, { useTheme } from "../ThemeProvider";

export async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value);
}

export function CopyCodeButton() {
    const { themeCssVars, getTheme, themeName } = useTheme()
    const [hasCopied, setHasCopied] = React.useState(false);
    const [codeType, setCodeType] = React.useState<'css' | 'json'>('css');
    const theme = getTheme(themeName)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return (
        <>
            {themeCssVars && (
                <Button
                    onClick={() => {
                        copyToClipboardWithMeta(
                            getThemeCode(theme, themeCssVars, codeType)
                        );
                        setHasCopied(true);
                    }}
                    className="md:hidden"
                >
                    {hasCopied ? (
                        <CheckIcon className="w-4 h-4 mr-2" />
                    ) : (
                        <CopyIcon className="w-4 h-4 mr-2" />
                    )}
                    Copy
                </Button>
            )}

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="sticky bottom-0 hidden font-bold rounded md:flex">
                        复制代码
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl outline-none">
                    <DialogHeader>
                        <DialogTitle>主题CSS变量</DialogTitle>
                        <DialogDescription>
                            将您的配色方案生成为代码。
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="css" className="w-full" onValueChange={(value) => setCodeType(value as 'css' | 'json')}>
                        <TabsList>
                            <TabsTrigger value="css">CSS</TabsTrigger>
                            <TabsTrigger value="json">JSON</TabsTrigger>
                        </TabsList>
                        <TabsContent value="css" className="text-sm text-muted-foreground">
                            复制以下代码到<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">src/index.css</code>中，作为默认主题。
                        </TabsContent>
                        <TabsContent value="json" className="text-sm text-muted-foreground">
                            复制以下代码到<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">src/components/themes/themes.ts</code>中，切换主题时使用。
                        </TabsContent>
                    </Tabs>

                    <ThemeProvider defaultTheme="zinc" className="relative">
                        <CustomizerCode theme={theme} themeCssVars={themeCssVars} codeType={codeType} />
                        {themeCssVars && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    copyToClipboardWithMeta(
                                        getThemeCode(theme, themeCssVars, codeType)
                                    );
                                    setHasCopied(true);
                                }}
                                className="absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground"
                            >
                                {hasCopied ? (
                                    <CheckIcon className="w-4 h-4 mr-2" />
                                ) : (
                                    <CopyIcon className="w-4 h-4 mr-2" />
                                )}
                                Copy
                            </Button>
                        )}
                    </ThemeProvider>
                </DialogContent>
            </Dialog>
        </>
    );
}

function CustomizerCode({
    theme,
    themeCssVars,
    codeType
}: {
    theme: ITheme,
    themeCssVars?: IThemeCssVars,
    codeType: 'css' | 'json'
}) {
    return (
        <ThemeProvider defaultTheme="zinc" className="relative space-y-4">
            <div data-rehype-pretty-code-fragment="">
                <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-gray-200">
                        {getThemeCode(theme, themeCssVars, codeType)}
                    </code>
                </pre>
            </div>
        </ThemeProvider>
    );
}

function getThemeCode(theme: ITheme, cssVars: IThemeCssVars | undefined, codeType: 'css' | 'json') {
    if (!cssVars) {
        return "";
    }

    return template(codeType === 'css' ? BASE_STYLES_WITH_VARIABLES : BASE_THEME_WITH_VARIABLES)({
        theme,
        cssVars,
    });
}

const BASE_STYLES_WITH_VARIABLES = `
  @layer base {
    :root {
      --background: <%- cssVars.light["background"] %>;
      --foreground: <%- cssVars.light["foreground"] %>;
      --card: <%- cssVars.light["card"] %>;
      --card-foreground: <%- cssVars.light["card-foreground"] %>;
      --popover: <%- cssVars.light["popover"] %>;
      --popover-foreground: <%- cssVars.light["popover-foreground"] %>;
      --primary: <%- cssVars.light["primary"] %>;
      --primary-foreground: <%- cssVars.light["primary-foreground"] %>;
      --secondary: <%- cssVars.light["secondary"] %>;
      --secondary-foreground: <%- cssVars.light["secondary-foreground"] %>;
      --muted: <%- cssVars.light["muted"] %>;
      --muted-foreground: <%- cssVars.light["muted-foreground"] %>;
      --accent: <%- cssVars.light["accent"] %>;
      --accent-foreground: <%- cssVars.light["accent-foreground"] %>;
      --destructive: <%- cssVars.light["destructive"] %>;
      --destructive-foreground: <%- cssVars.light["destructive-foreground"] %>;
      --border: <%- cssVars.light["border"] %>;
      --input: <%- cssVars.light["input"] %>;
      --input-background: <%- cssVars.light["input-background"] %>;
      --ring: <%- cssVars.light["ring"] %>;
      --radius: <%- cssVars.light["radius"] %>;
    }
   
    .dark {
      --background: <%- cssVars.dark["background"] %>;
      --foreground: <%- cssVars.dark["foreground"] %>;
      --card: <%- cssVars.dark["card"] %>;
      --card-foreground: <%- cssVars.dark["card-foreground"] %>;
      --popover: <%- cssVars.dark["popover"] %>;
      --popover-foreground: <%- cssVars.dark["popover-foreground"] %>;
      --primary: <%- cssVars.dark["primary"] %>;
      --primary-foreground: <%- cssVars.dark["primary-foreground"] %>;
      --secondary: <%- cssVars.dark["secondary"] %>;
      --secondary-foreground: <%- cssVars.dark["secondary-foreground"] %>;
      --muted: <%- cssVars.dark["muted"] %>;
      --muted-foreground: <%- cssVars.dark["muted-foreground"] %>;
      --accent: <%- cssVars.dark["accent"] %>;
      --accent-foreground: <%- cssVars.dark["accent-foreground"] %>;
      --destructive: <%- cssVars.dark["destructive"] %>;
      --destructive-foreground: <%- cssVars.dark["destructive-foreground"] %>;
      --border: <%- cssVars.dark["border"] %>;
      --input: <%- cssVars.dark["input"] %>;
      --input-background: <%- cssVars.dark["input-background"] %>;
      --ring: <%- cssVars.dark["ring"] %>;
      --radius: <%- cssVars.light["radius"] %>;
    }
  }
  `;

const BASE_THEME_WITH_VARIABLES = `
   {
    name: "<%- theme.name %>",      
    label: "<%- theme.label %>",
    cssVars: {
      light: {
        background: "<%- cssVars.light["background"] %>",
        foreground: "<%- cssVars.light["foreground"] %>",
        card: "<%- cssVars.light["card"] %>",
        "card-foreground": "<%- cssVars.light["card-foreground"] %>",
        popover: "<%- cssVars.light["popover"] %>",
        "popover-foreground": "<%- cssVars.light["popover-foreground"] %>",
        primary: "<%- cssVars.light["primary"] %>",
        "primary-foreground": "<%- cssVars.light["primary-foreground"] %>",
        secondary: "<%- cssVars.light["secondary"] %>",
        "secondary-foreground": "<%- cssVars.light["secondary-foreground"] %>",
        muted: "<%- cssVars.light["muted"] %>",
        "muted-foreground": "<%- cssVars.light["muted-foreground"] %>",
        accent: "<%- cssVars.light["accent"] %>",
        "accent-foreground": "<%- cssVars.light["accent-foreground"] %>",
        destructive: "<%- cssVars.light["destructive"] %>",
        "destructive-foreground": "<%- cssVars.light["destructive-foreground"] %>",
        border: "<%- cssVars.light["border"] %>",
        input: "<%- cssVars.light["input"] %>",
        "input-background": "<%- cssVars.light["input-background"] %>",
        ring: "<%- cssVars.light["ring"] %>",
        radius: "<%- cssVars.light["radius"] %>",
      },
      dark: {
        background: "<%- cssVars.dark["background"] %>",
        foreground: "<%- cssVars.dark["foreground"] %>",
        card: "<%- cssVars.dark["card"] %>",
        "card-foreground": "<%- cssVars.dark["card-foreground"] %>",
        popover: "<%- cssVars.dark["popover"] %>",
        "popover-foreground": "<%- cssVars.dark["popover-foreground"] %>",
        primary: "<%- cssVars.dark["primary"] %>",
        "primary-foreground": "<%- cssVars.dark["primary-foreground"] %>",
        secondary: "<%- cssVars.dark["secondary"] %>",
        "secondary-foreground": "<%- cssVars.dark["secondary-foreground"] %>",
        muted: "<%- cssVars.dark["muted"] %>",
        "muted-foreground": "<%- cssVars.dark["muted-foreground"] %>",
        accent: "<%- cssVars.dark["accent"] %>",
        "accent-foreground": "<%- cssVars.dark["accent-foreground"] %>",
        destructive: "<%- cssVars.dark["destructive"] %>",
        "destructive-foreground": "<%- cssVars.dark["destructive-foreground"] %>",
        border: "<%- cssVars.dark["border"] %>",
        input: "<%- cssVars.dark["input"] %>",
        "input-background": "<%- cssVars.dark["input-background"] %>",
        ring: "<%- cssVars.dark["ring"] %>",
        radius: "<%- cssVars.light["radius"] %>",
      },
    },
  }
  `;