import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirectDocument,
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
import { AppearanceType, ITheme, ThemeProvider } from "@/components/themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ColorSchemeType } from "@/components/themes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
];

export function ErrorBoundary() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  return <ErrorPage error={error} />
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader)

  const userAppearance = cookies[ThemeProvider.appearanceCookieName] as AppearanceType
  const systemColorScheme = cookies[ThemeProvider.prefersColorSchemeCookieName] as ColorSchemeType

  let appearance = userAppearance
  if (appearance === "system" && systemColorScheme) {
    appearance = systemColorScheme
  }

  return {
    theme: (cookies[ThemeProvider.themeCookieName] ?? "zinc") as ITheme["name"],
    appearance
  }
}

// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="zh-CN" className="min-h-screen">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" type="image/svg+xml" href="/logo.svg" />
//         <Meta />
//         <Links />
//       </head>
//       {children}
//     </html>
//   );
// }

export default function App() {
  let theme, appearance;

  const data = useLoaderData<typeof loader>();
  if (data) {
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
            <Outlet />
          </TooltipProvider>
          <ScrollRestoration />
          <Scripts />
        </body>
      </ThemeProvider>
    </html>
  );
}
