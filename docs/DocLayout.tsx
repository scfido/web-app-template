import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { MDXProvider } from '@mdx-js/react';
import { AppearanceToggle } from "@/components/themes/AppearanceToggle";
import ThemeWrapper from "@/components/themes/ThemeWrapper"
import ThemeCustomizer from "@/components/themes/ThemeCustomizer";
import { TooltipProvider } from "@/components/ui/tooltip";

const Layout = () => {
    return (
        <ThemeWrapper>
            <TooltipProvider>
                <div className="flex flex-col h-screen">
                    <header className="flex gap-1 items-center bg-gray-100 dark:bg-gray-800 dark:text-white py-4 px-6">
                        <h1 className="flex-1 text-2xl font-bold">组件使用示例</h1>
                        <ThemeCustomizer />
                        <AppearanceToggle />
                    </header>
                    <div className="flex flex-1">
                        <aside className="w-80">
                            <Sidebar />
                        </aside>
                        <main className="flex-1 lg:border-l">
                            <MDXProvider>
                                <div className="prose lg:prose-xl">
                                    <Outlet />
                                </div>
                            </MDXProvider>
                        </main>
                    </div>
                </div>
            </TooltipProvider>
        </ThemeWrapper>
    )
}


export default Layout