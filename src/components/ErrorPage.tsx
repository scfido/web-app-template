import { buttonVariants, Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { ArrowLeft, Home } from "lucide-react";
import { ErrorResponse, isRouteErrorResponse, Link, useNavigate } from "@remix-run/react";

interface IComponentProps {
    error?: unknown
}
const Component = ({ error }: IComponentProps) => {
    const navigate = useNavigate();
    const errorMessage = isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : error instanceof Error
            ? error.message
            : "未知错误"

    return (
        <div className="flex flex-col justify-center items-center h-full w-full ">
            <div className="flex items-center justify-center sm:mt-16">
                <Link to="/">
                    <img src="/logo.svg" alt="logo" className="h-16" />
                </Link>
            </div>
            <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mt-2">
                <CardHeader className="bg-destructive/30 p-2 sm:h-20 sm:p-6">
                    <CardTitle className="text-center">抱歉</CardTitle>
                    <CardDescription className="text-center">
                        您访问的页面出现了错误！
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4 sm:px-16 min-h-72" >
                    <p className="text-sm text-muted-foreground">{errorMessage}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link to="/" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "flex items-center gap-1")} ><Home size={16} /></Link>
                    <Button onClick={() => navigate(-1)} variant="default" ><ArrowLeft size={16} />后退</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Component;
