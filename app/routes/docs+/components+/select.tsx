import { useTitle } from "ahooks"
import { ComponentPreview } from "@/docs"
import Select from "@/components/Select"
import { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => [
    { title: "Select" }
]

const Component = () => {

    const options = [
        {
            key: "fruits",
            label: "水果",
            options: [
                { value: "apple", label: "苹果" },
                { value: "banana", label: "香蕉" },
                { value: "blueberry", label: "蓝莓", disabled: true },
                { value: "grapes", label: "葡萄" },
                { value: "pineapple", label: "菠萝" },
            ]
        },
        { key: "divider1", label: "---" },
        {
            key: "vegetables",
            label: "蔬菜",
            options: [
                { value: "carrot", label: "胡萝卜" },
                { value: "lettuce", label: "生菜" },
                { value: "tomato", label: "西红柿", disabled: true },
                { value: "potato", label: "土豆" },
            ]
        }
    ]

    const options2 = [
        { value: "apple", label: "苹果" },
        { value: "banana", label: "香蕉" },
        { value: "blueberry", label: "蓝莓", disabled: true },
        { value: "grapes", label: "葡萄" },
        { value: "pineapple", label: "菠萝" },
    ]

    return (
        <article className="" >
            <h1 className="mb-4">Select</h1>
            <ComponentPreview title="常规" description="分组显示和分隔符">
                <div className="flex flex-col gap-4">
                    <Select className="w-[180px]" options={options} />
                    <Select className="w-[180px]" options={options} disabled value="banana" />
                </div>
            </ComponentPreview>

            <ComponentPreview title="Placeholder">
                <div className="flex flex-col gap-4">
                    <Select className="w-[180px]" options={options2} placeholder="请选择您的水果..." />
                </div>
            </ComponentPreview>

            <ComponentPreview title="默认值">
                <div className="flex flex-col gap-4">
                    <Select className="w-[180px]" options={options2} defaultValue="banana" />
                </div>
            </ComponentPreview>
            <ComponentPreview title="尺寸">
                <div className="flex flex-col gap-4">
                    <Select className="w-[180px]" options={options2} defaultValue="banana" size="lg" />
                    <Select className="w-[180px]" options={options2} defaultValue="banana" size="default" />
                    <Select className="w-[180px]" options={options2} defaultValue="banana" size="sm" />
                </div>
            </ComponentPreview>
        </article>
    )
}

export default Component
