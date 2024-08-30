import { useTitle } from "ahooks"
import { ComponentPreview } from ".."

const Component = () => {
    useTitle("组件测试")

    return (
        <article className="" >
            <h1 className="p-4">组件测试</h1>
            <ComponentPreview title="示例" description="直接使用代码的示例，好处是编辑器有代码提示">
                <p className="p-4">测试组件示例</p>
            </ComponentPreview>
        </article>
    )
}

export default Component
