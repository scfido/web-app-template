import { ComponentPreview } from "@/docs"
import { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => [
    { title: "组件模版" }
]

const Component = () => {

    return (
        <article className="" >
            <h1 className="p-4 dark:text-white">Test</h1>
           
            <ComponentPreview title="常规">
                <div className="flex flex-col gap-4">
                    <h3>👌测试组件</h3>
                </div>
            </ComponentPreview>
        </article>
    )
}

export default Component
