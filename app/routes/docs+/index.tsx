import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "@remix-run/react";

const Component = () => {

    return (
        <div className="container  mx-auto ">
            <Card className="mx-auto  mt-2">
                <CardContent className="flex flex-col items-center justify-center gap-4 sm:px-16 min-h-72">
                    <CardTitle className="text-center">组件介绍文档</CardTitle>
                    <CardDescription className="text-center">
                        欢迎来到组件介绍文档的首页！在这里，您可以找到所有组件的详细信息和使用示例。
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}

export default Component;
