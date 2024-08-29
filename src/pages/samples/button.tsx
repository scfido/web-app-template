import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useTitle } from "ahooks"
import { Camera } from "lucide-react"

const Page = () => {
    useTitle("按钮示例")

    return (
        <article className="prose lg:prose-xl">
            <h1 className="p-4">按钮示例</h1>
            <Card className="m-8 not-prose">
                <CardHeader>
                    <CardTitle>颜色</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Button>默认</Button>
                    <Button variant={"secondary"} >次要</Button>
                    <Button variant={"outline"}>边框</Button>
                    <Button variant={"link"}>链接</Button>
                    <Button variant={"ghost"}>幽灵</Button>
                    <Button variant={"destructive"}>危险</Button>
                </CardContent>
            </Card >

            <Card className="m-8 not-prose">
                <CardHeader>
                    <CardTitle>颜色</CardTitle>
                    <CardDescription>禁用状态</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Button disabled>默认</Button>
                    <Button disabled variant={"secondary"} >次要</Button>
                    <Button disabled variant={"outline"}>边框</Button>
                    <Button disabled variant={"link"}>链接</Button>
                    <Button disabled variant={"ghost"}>幽灵</Button>
                    <Button disabled variant={"destructive"}>危险</Button>
                </CardContent>
            </Card >

            <Card className="m-8 not-prose">
                <CardHeader>
                    <CardTitle>大小</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Button size={"lg"} >大</Button>
                    <Button >默认</Button>
                    <Button size={"sm"} >小</Button>
                    <Button size={"icon"} ><Camera /></Button>
                </CardContent>
            </Card >
        </article>
    )
}

export default Page;