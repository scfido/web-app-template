import { json, useLoaderData } from "@remix-run/react"

export const loader = async () => {
    throw json({ message: "资源不存在" }, { status: 404, statusText: "Not Found" })
}

export default function Test1() {
    const data = useLoaderData<typeof loader>()
    return (
        <div>
            <pre>
                <code>
                    {JSON.stringify(data, null, 2)}
                </code>
            </pre>
        </div>
    )
}
