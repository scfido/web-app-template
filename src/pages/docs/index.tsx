import {
    RouteObject,
} from "react-router-dom";
import DocLayout from "./DocLayout";

const router: RouteObject[] = [
    {
        element: <DocLayout />,
        children: [
            {
                index: true,
                lazy: () => import("@/pages/docs/components"),
            },
            {
                path: "components/*",
                lazy: () => import("@/pages/docs/components"),
            },
            {
                path: "authentications/*",
                lazy: () => import("@/pages/docs/authentications"),
            },
        ]
    }
];

import ComponentPreview from "./ComponentPreview";

export { router, ComponentPreview }
