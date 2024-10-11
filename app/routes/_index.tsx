import { Button } from "@/components/ui/button";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { FileText, LogIn, LogOut, User } from "lucide-react";
import { authenticator } from "~/.server/auth";
import fetchApi from "~/.server/fetchApi";
import { getSession } from "~/.server/session";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/sign-in",
  });

  const session = await getSession(request.headers.get("Cookie"));
  const user = await fetchApi.get("/account/currentuser", { session })
  return { user };
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <div className=" flex items-center gap-2 leading-6 text-gray-700 dark:text-gray-200">
            <User /> <span>{user.name}</span>
          </div>
          <ul>
            {resources.map(({ href, text, icon }) => (
              <li key={href}>
                <Link
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  to={href}
                >
                  {icon}
                  {text}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <Form method="post" action="/sign-out" >
              <Button className="flex items-center gap-2"> <LogOut size={16} /> 注销</Button>
            </Form>
          </div>
        </nav>
      </div>
    </div>
  );
}

const resources = [
  {
    href: "/docs",
    text: "文档",
    icon: <FileText className="text-foreground" />,
  }
];
