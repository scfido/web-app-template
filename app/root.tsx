import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import tailwind from "./tailwind.css?url";
import NotFoundPage from "@/components/NotFoundPage";
import ErrorPage from "@/components/ErrorPage";
import { parseCookies } from "@/lib/cookie";
import { AppearanceType, Theme, ThemeProvider } from "@/components/themes";
import { TooltipProvider } from "@/components/ui/tooltip";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
];

export function ErrorBoundary() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      {isNotFound ? <NotFoundPage /> : <ErrorPage error={error} />}
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader)

  return {
    theme: (cookies[ThemeProvider.themeCookieName] ?? "zinc") as Theme["name"],
    appearance: (cookies[ThemeProvider.appearanceCookieName] ?? "system") as AppearanceType,
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();
  let theme, appearance;
  if (!error) {
    const data = useLoaderData<typeof loader>();
    theme = data.theme;
    appearance = data.appearance;
  }

  return (
    <html lang="zh-CN" className="min-h-screen">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <Meta />
        <Links />
      </head>
      <ThemeProvider asChild defaultTheme={theme} defaultAppearance={appearance}>
        <body className="min-h-screen">
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <ScrollRestoration />
          <Scripts />
        </body>
      </ThemeProvider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
