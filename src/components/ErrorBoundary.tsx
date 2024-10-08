import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { AlertCircle } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="w-full bg-destructive/10 shadow-lg border border-destructive p-8">
      <div className="flex items-center justify-center mb-6">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      {isRouteErrorResponse(error) ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="text-center text-muted-foreground mb-4">{error.data.message}</p>
        </>
      ) : error instanceof Error ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-4">错误</h1>
          <p className="text-center text-muted-foreground mb-4">{error.message}</p>
          <details className="mt-4 p-4 bg-destructive/20 rounded-md">
            <summary className="cursor-pointer text-sm  mb-2">
              错误详情
            </summary>
            <pre className="text-xs overflow-auto">{error.stack}</pre>
          </details>
        </>
      ) : (
        <h1 className="text-2xl font-bold text-center mb-4">未知错误</h1>
      )}
    </div>
  );
}