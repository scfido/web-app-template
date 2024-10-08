import { Outlet } from "@remix-run/react"

// 必须要有个这个空的Layout，用于导出ErrorBoundary，否则出错时不会应用上级Layout。
// 你可以注释export ErrorBoundary，看看效果。

export { ErrorBoundary  } from "@/components/ErrorBoundary"

export default function Layout() {
    return <Outlet />
}

