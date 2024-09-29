import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export interface IComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
}

const ComponentPreview = (props: IComponentPreviewProps) => {
    const {title, description, children} = props
    return (
        <Card className="not-prose mb-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card >
    )
}

export default ComponentPreview