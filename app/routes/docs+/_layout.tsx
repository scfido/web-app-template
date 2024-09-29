import { MDXProvider } from '@mdx-js/react';
import ThemeCustomizer from "@/components/themes/ThemeCustomizer";
import { Sidebar } from "@/docs"
import { Home } from "lucide-react";
import { Link, Outlet, useInRouterContext, useLocation, useMatch, useMatches, useRouteLoaderData } from "@remix-run/react";
import { AppearanceToggle } from "@/components/themes/AppearanceToggle";
import mdxStyle from "@/components/themes/customizer/styles/mdx.css?url"
import { LinksFunction } from "@remix-run/node";


export const links: LinksFunction = () => [
    { rel: "stylesheet", href: mdxStyle },
]


const Layout = () => {

    const matches = useMatches()
    const isMdx = matches[matches.length - 1].handle?.documentType === "mdx";

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex gap-1 items-center bg-background dark:bg-gray-800 dark:text-white py-4 px-6">
                <h1 className="flex-1 text-2xl font-bold">组件使用示例</h1>
                <ThemeCustomizer />
                <AppearanceToggle />
                <Link to="/" className="ml-4"><Home size={16} /></Link>
            </header>
            <div className="flex flex-1">
                <aside className="w-80">
                    <Sidebar />
                </aside>
                <main className="container flex-1 lg:border-l p-4 mx-auto">
                    {isMdx ? <MDXProvider>
                        <div className="prose lg:prose-xl dark:prose-invert">
                            <Outlet />
                        </div>
                    </MDXProvider> : <Outlet />}
                </main>
            </div>
        </div>
    )
}


export default Layout