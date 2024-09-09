import {
    RouteObject,
} from "react-router-dom";
import Layout from "./Layout";
import ComponentPreview from "./ComponentPreview";
import Test from "./Test";

const router: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                index: true,
                lazy: () => import("./components"),
            },
            {
                path: "components/*",
                lazy: () => import("./components"),
            },
            {
                path: "forms/*",
                lazy: () => import("./forms"),
            },
           
            {
                path: "test",
                element: <Test />,
            }
        ]
    },
    {
        path: "authentications/*",
        lazy: () => import("./authentications"),
    },
];


export { router, ComponentPreview }
