import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { Fragment } from "react";
import template from "lodash.template";
import { ITheme } from "../themes";
import ThemeProvider, { useTheme } from "../ThemeProvider";

export async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value);
}

export function CopyCodeButton() {
    const { themeCssVars: customCssVars, themeName } = useTheme()
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return (
        <>
            {themeName && (
                <Button
                    onClick={() => {
                        copyToClipboardWithMeta(
                            getThemeCode(
                                themeName as any,
                                customCssVars?.light?.radius
                            )
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
                    <Tabs defaultValue="css" className="w-full">
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
                        <CustomizerCode />
                        {themeName && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    copyToClipboardWithMeta(
                                        getThemeCode(
                                            themeName as any,
                                            customCssVars?.light?.radius
                                        )
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

function CustomizerCode() {
    const { themeCssVars: customCssVars } = useTheme()

    return (
        <ThemeProvider defaultTheme="zinc" className="relative space-y-4">
            <div data-rehype-pretty-code-fragment="">
                <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        <span className="text-white line">@layer base &#123;</span>
                        <span className="text-white line">&nbsp;&nbsp;:root &#123;</span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
                            {customCssVars?.light["background"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
                            {customCssVars?.light["foreground"]};
                        </span>
                        {[
                            "card",
                            "popover",
                            "primary",
                            "secondary",
                            "muted",
                            "accent",
                            "destructive",
                        ].map((prefix) => (
                            <Fragment key={prefix}>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                                    {
                                        customCssVars?.light[
                                        prefix as keyof typeof customCssVars.light
                                        ]
                                    }
                                    ;
                                </span>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                                    {
                                        customCssVars?.light[
                                        `${prefix}-foreground` as keyof typeof customCssVars.light
                                        ]
                                    }
                                    ;
                                </span>
                            </Fragment>
                        ))}
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
                            {customCssVars?.light["border"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
                            {customCssVars?.light["input"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
                            {customCssVars?.light["ring"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--radius: {customCssVars?.light?.radius}
                        </span>
                        <span className="text-white line">&nbsp;&nbsp;&#125;</span>
                        <span className="text-white line">&nbsp;</span>
                        <span className="text-white line">&nbsp;&nbsp;.dark &#123;</span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
                            {customCssVars?.dark["background"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
                            {customCssVars?.dark["foreground"]};
                        </span>
                        {[
                            "card",
                            "popover",
                            "primary",
                            "secondary",
                            "muted",
                            "accent",
                            "destructive",
                        ].map((prefix) => (
                            <Fragment key={prefix}>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                                    {
                                        customCssVars?.dark[
                                        prefix as keyof typeof customCssVars.dark
                                        ]
                                    }
                                    ;
                                </span>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                                    {
                                        customCssVars?.dark[
                                        `${prefix}-foreground` as keyof typeof customCssVars.dark
                                        ]
                                    }
                                    ;
                                </span>
                            </Fragment>
                        ))}
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
                            {customCssVars?.dark["border"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
                            {customCssVars?.dark["input"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
                            {customCssVars?.dark["ring"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--radius: {customCssVars?.dark?.radius}
                        </span>
                        <span className="text-white line">&nbsp;&nbsp;&#125;</span>
                        <span className="text-white line">&#125;</span>
                    </code>
                </pre>
            </div>
        </ThemeProvider>
    );
}

function getThemeCode(theme: ITheme, radius?: string) {
    if (!theme) {
        return "";
    }

    if (!radius) {
        radius = "0.5rem";
    }

    return template(BASE_STYLES_WITH_VARIABLES)({
        colors: theme.cssVars,
        radius,
    });
}

const BASE_STYLES_WITH_VARIABLES = `
  @layer base {
    :root {
      --background: <%- colors.light["background"] %>;
      --foreground: <%- colors.light["foreground"] %>;
      --card: <%- colors.light["card"] %>;
      --card-foreground: <%- colors.light["card-foreground"] %>;
      --popover: <%- colors.light["popover"] %>;
      --popover-foreground: <%- colors.light["popover-foreground"] %>;
      --primary: <%- colors.light["primary"] %>;
      --primary-foreground: <%- colors.light["primary-foreground"] %>;
      --secondary: <%- colors.light["secondary"] %>;
      --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
      --muted: <%- colors.light["muted"] %>;
      --muted-foreground: <%- colors.light["muted-foreground"] %>;
      --accent: <%- colors.light["accent"] %>;
      --accent-foreground: <%- colors.light["accent-foreground"] %>;
      --destructive: <%- colors.light["destructive"] %>;
      --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
      --border: <%- colors.light["border"] %>;
      --input: <%- colors.light["input"] %>;
      --ring: <%- colors.light["ring"] %>;
      --radius: <%- radius %>rem;
    }
   
    .dark {
      --background: <%- colors.dark["background"] %>;
      --foreground: <%- colors.dark["foreground"] %>;
      --card: <%- colors.dark["card"] %>;
      --card-foreground: <%- colors.dark["card-foreground"] %>;
      --popover: <%- colors.dark["popover"] %>;
      --popover-foreground: <%- colors.dark["popover-foreground"] %>;
      --primary: <%- colors.dark["primary"] %>;
      --primary-foreground: <%- colors.dark["primary-foreground"] %>;
      --secondary: <%- colors.dark["secondary"] %>;
      --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
      --muted: <%- colors.dark["muted"] %>;
      --muted-foreground: <%- colors.dark["muted-foreground"] %>;
      --accent: <%- colors.dark["accent"] %>;
      --accent-foreground: <%- colors.dark["accent-foreground"] %>;
      --destructive: <%- colors.dark["destructive"] %>;
      --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
      --border: <%- colors.dark["border"] %>;
      --input: <%- colors.dark["input"] %>;
      --ring: <%- colors.dark["ring"] %>;
      --radius: <%- radius %>rem;
    }
  }
  `;
