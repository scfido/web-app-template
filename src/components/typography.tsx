import React from "react"

export interface ITyprographyHeaderProps
    extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
}

// 示例：forwardRef 用法和暴露HTML元素原生属性的方法
export const H1 = React.forwardRef<HTMLHeadingElement, ITyprographyHeaderProps>(
    (props, ref) => {
        const { children, ...rest } = props
        return (
            <h1
                ref={ref}
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
                {...rest}
            >
                {children}
            </h1>
        )
    }
)

