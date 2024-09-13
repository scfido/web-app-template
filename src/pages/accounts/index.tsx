import {
    RouteObject,
} from "react-router-dom";
import Layout from "@/layouts/Information";
import Signin from "./Signin";
import Signup from "./Signup";
import NotFound from "../NotFound";

const router: RouteObject[] = [
    {
        element: <Layout />,
        children: [
          
            {
                path: "signin",
                element: <Signin />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ]
    }
]

export { router }
