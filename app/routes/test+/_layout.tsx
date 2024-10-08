import { AppearanceToggle } from "@/components/themes/AppearanceToggle";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Outlet } from "@remix-run/react";

export { ErrorBoundary } from "@/components/ErrorBoundary"

const TestLayout = () => {
    return (
        <Card className="container mx-auto my-4">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>测试页</span>
                    <div className="flex gap-2 items-center">
                        <AppearanceToggle />
                        <Link className={buttonVariants({ variant: "outline"})} to="/test">目录</Link>
                    </div>
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