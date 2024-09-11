import {
    RouteObject,
} from "react-router-dom";
import Layout from "./Layout";
import Signin from "./Signin";
import Signup from "./Signup";

const router: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <h1>认证页面</h1>,
            },
            {
                path: "signin",
                element: <Signin />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
        ]
    }
]

export { router }
