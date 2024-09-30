import { cn } from "@/lib/utils";
import { Link, MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "404 - 页面没找到" },
    ];
}

const NotFound = () => {

    return (
        <div id="notfound" className="h-screen">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className={cn(
                    "font-montserrat font-black md:text-[230px] text-9xl text-transparent leading-[250px]  ",
                    "bg-[url('/images/notfound-bg.jpg')] bg-no-repeat bg-clip-text bg-center bg-cover")}>Oops!</h1>
                <h2 className="font-montserrat font-bold leading-[50px] mt-8">404 - 页面没找到</h2>
                <p className="font-montserrat font-normal leading-[30px] text-center">您访问的页面可能已被删除、更名或暂时不可用。</p>
                <Link to="/" className="mt-10 font-montserrat font-bold text-sm  bg-blue-600 dark:bg-blue-800 py-4 px-8 rounded-full text-white shadow-lg">返回首页</Link>
            </div>
        </div>
    )
}

export default NotFound;
