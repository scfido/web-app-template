import { useLoaderData } from "@remix-run/react"

export const loader = async () => {

    console.log("server loader");
    return {
        theme: "zinc",
        appearance: "system",
    }
}

export const clientLoader = async () => {

    console.log("client loader");
    return {
        theme: "zinc",
        appearance: "system1",
        client: true,
    }
}

clientLoader.hydrate = true

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