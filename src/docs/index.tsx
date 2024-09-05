import {
    RouteObject,
} from "react-router-dom";
import Layout from "./Layout";

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
                path: "authentications/*",
                lazy: () => import("./authentications"),
            },
        ]
    }
];

import ComponentPreview from "./ComponentPreview";

export { router, ComponentPreview }
