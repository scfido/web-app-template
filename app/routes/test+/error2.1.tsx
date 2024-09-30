import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    throw new Error("服务器抛出的测试错误。")
}

export default function Test1() {
    const data = useLoaderData<typeof loader>()
    return <div>
        <pre>
            <code>
                {JSON.stringify(data, null, 2)}
            </code>
        </pre>
    </div>
}