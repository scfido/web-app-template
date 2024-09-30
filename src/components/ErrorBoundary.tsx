import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        {isRouteErrorResponse(error) ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">
              {error.status} {error.statusText}
            </h1>
            <p className="text-center text-gray-600 mb-4">{error.data}</p>
          </>
        ) : error instanceof Error ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">错误</h1>
            <p className="text-center text-gray-600 mb-4">{error.message}</p>
            <details className="mt-4 p-4 bg-gray-100 rounded-md">
              <summary className="cursor-pointer text-sm text-gray-700 mb-2">
                错误详情
              </summary>
              <pre className="text-xs overflow-auto">{error.stack}</pre>
            </details>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-center mb-4">未知错误</h1>
        )}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
  );
}