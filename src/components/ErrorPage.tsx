import { usePrefersColorScheme } from "@/lib/usePrefersColorScheme";
import { isRouteErrorResponse, Links, Meta, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import { AlertCircle } from "lucide-react";

function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      {isRouteErrorResponse(error) ? (
        <>
          <h1 className="text-2xl font-bold text-center dark:text-white mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{error.data}</p>
        </>
      ) : error instanceof Error ? (
        <>
          <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-4">错误</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
          <details className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <summary className="cursor-pointer text-sm text-gray-700 dark:text-gray-300 mb-2">
              错误详情
            </summary>
            <pre className="text-xs overflow-auto text-black dark:text-white">{error.stack}</pre>
          </details>
        </>
      ) : (
        <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-4">未知错误</h1>
      )}
      <div className="mt-6 text-center">
        <a
          href="/"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <html lang="zh-CN" className="min-h-screen">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <title>错误</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <ErrorBoundary />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}