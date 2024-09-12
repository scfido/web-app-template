import {
    RouteObject,
} from "react-router-dom";
import Test1 from "./Test1";
import EmptyLayout from "@/layouts/Empty";

const router: RouteObject[] = [
    {
        element: <EmptyLayout />,
        children: [
            {
                index: true,
                element: <Test1 />,
            },
            {
                path: "test1",
                element: <Test1 />,
            }
        ]
    }
]

export { router }
