import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { MDXProvider } from '@mdx-js/react';


const SampleLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white py-4 px-6">
                <h1 className="text-2xl font-bold">组件使用示例</h1>
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
    )
}


export default SampleLayout