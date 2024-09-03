import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckIcon, CopyIcon } from "lucide-react";
import React from "react";
import template from "lodash.template";
import { Theme } from "../themes";
import ThemeWrapper from "../ThemeWrapper";
import { useThemeConfigStore } from "../themeConfigStore";
import "./styles/mdx.css"

export async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value);
}

export function CopyCodeButton() {
    const cssVars = useThemeConfigStore(state => state.cssVars)
    const activeTheme = useThemeConfigStore();
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return (
        <>
            {activeTheme && (
                <Button
                    onClick={() => {
                        copyToClipboardWithMeta(
                            getThemeCode(
                                activeTheme as any,
                                cssVars.light?.radius || 0.5
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
                            复制以下代码到<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">src/index.css</code>中，替换相应内容。
                        </DialogDescription>
                    </DialogHeader>
                    <ThemeWrapper defaultTheme="zinc" className="relative">
                        <CustomizerCode />
                        {activeTheme && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    copyToClipboardWithMeta(
                                        getThemeCode(
                                            activeTheme as any,
                                            cssVars.light?.radius || 0.5
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
                    </ThemeWrapper>
                </DialogContent>
            </Dialog>
        </>
    );
}

function CustomizerCode() {
    const cssVars = useThemeConfigStore(state => state.cssVars)
    const activeTheme = useThemeConfigStore();

    return (
        <ThemeWrapper defaultTheme="zinc" className="relative space-y-4">
            <div data-rehype-pretty-code-fragment="">
                <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        <span className="text-white line">@layer base &#123;</span>
                        <span className="text-white line">&nbsp;&nbsp;:root &#123;</span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
                            {activeTheme?.cssVars.light["background"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
                            {activeTheme?.cssVars.light["foreground"]};
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
                            <>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                                    {
                                        activeTheme?.cssVars.light[
                                        prefix as keyof typeof activeTheme.cssVars.light
                                        ]
                                    }
                                    ;
                                </span>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                                    {
                                        activeTheme?.cssVars.light[
                                        `${prefix}-foreground` as keyof typeof activeTheme.cssVars.light
                                        ]
                                    }
                                    ;
                                </span>
                            </>
                        ))}
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
                            {activeTheme?.cssVars.light["border"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
                            {activeTheme?.cssVars.light["input"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
                            {activeTheme?.cssVars.light["ring"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--radius: {cssVars.light?.radius}
                            rem;
                        </span>
                        <span className="text-white line">&nbsp;&nbsp;&#125;</span>
                        <span className="text-white line">&nbsp;</span>
                        <span className="text-white line">&nbsp;&nbsp;.dark &#123;</span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
                            {activeTheme?.cssVars.dark["background"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
                            {activeTheme?.cssVars.dark["foreground"]};
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
                            <>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                                    {
                                        activeTheme?.cssVars.dark[
                                        prefix as keyof typeof activeTheme.cssVars.dark
                                        ]
                                    }
                                    ;
                                </span>
                                <span className="text-white line">
                                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                                    {
                                        activeTheme?.cssVars.dark[
                                        `${prefix}-foreground` as keyof typeof activeTheme.cssVars.dark
                                        ]
                                    }
                                    ;
                                </span>
                            </>
                        ))}
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
                            {activeTheme?.cssVars.dark["border"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
                            {activeTheme?.cssVars.dark["input"]};
                        </span>
                        <span className="text-white line">
                            &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
                            {activeTheme?.cssVars.dark["ring"]};
                        </span>
                        <span className="text-white line">&nbsp;&nbsp;&#125;</span>
                        <span className="text-white line">&#125;</span>
                    </code>
                </pre>
            </div>
        </ThemeWrapper>
    );
}

function getThemeCode(theme: Theme, radius?: number) {
    if (!theme) {
        return "";
    }

    if (!radius) {
        radius = 0.5;
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
    }
  }
  `;
