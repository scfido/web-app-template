import { LoaderFunctionArgs } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import ErrorBoundary from "@/components/ErrorBoundary"

export { ErrorBoundary }

export default function Test1() {
    return <div>
        <h1>测试子路由错误</h1>
    </div>
}