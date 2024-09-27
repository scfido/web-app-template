import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Outlet } from "@remix-run/react";

const TestLayout = () => {
    return (
        <Card className="container mx-auto my-4">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>测试页</span>
                    <Link className={buttonVariants({ variant: "outline", size: "sm" })} to="/test">目录</Link>
                </CardTitle>
                <CardDescription>简单功能测试页面</CardDescription>
            </CardHeader>
            <CardContent>
                <Outlet />
            </CardContent>
        </Card>
    );
};

export default TestLayout;