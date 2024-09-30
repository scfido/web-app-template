import { LinksFunction, MetaFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: "/css/notfound.css" },
];

export const meta: MetaFunction = () => {
    return [
        { title: "404 - 页面没找到" },
    ];
};

const NotFound = () => {
    return (
        <body className="">
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>Oops!</h1>
                    </div>
                    <h2>404 - 页面没找到</h2>
                    <p>您访问的页面可能已被删除、更名或暂时不可用。</p>
                    <a href="#">返回首页</a>
                </div>
            </div>
        </body>
    )
}

export default NotFound;
