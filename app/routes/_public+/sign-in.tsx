import { CheckBoxFormItem, InputFormItem, BeringForm } from "@/components/forms"
import { SubmitButton } from "@/components/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { z } from "@/lib/zod-cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, redirect } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import { useRemixForm } from "remix-hook-form";
import { authenticator, IUser } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

// 登录表单架构
export const siginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  remember: z.boolean().optional(),
})
export type SiginFormSchemaType = z.infer<typeof siginFormSchema>


export async function loader({ request, params }: LoaderFunctionArgs) {
  // 如果用户已经登录，则重定向到 /或者 returnUrl 参数指定的路径
  // 从 url 中获取 returnUrl 参数 
  const url = new URL(request.url);
  const returnUrl = url.searchParams.get("returnUrl") ?? "/";

  return await authenticator.isAuthenticated(request, {
    successRedirect: returnUrl,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const returnUrl = url.searchParams.get("returnUrl") ?? "/";
  let user: IUser | null = null;
  try {
    user = await authenticator.authenticate("user-pass", request, {
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      // here the error is related to the authentication process
      return json(error.cause, {
        status: 400,
      });
    }
    return json(error, { status: 400 });
  }

  // manually get the session
  const session = await getSession(request.headers.get("cookie"));
  // and store the user data
  session.set(authenticator.sessionKey, user);

  // 记住登录信息，则设置 cookie 过期时间为 7 天，否则为 2 小时
  const maxAge = user.remember ? 60 * 60 * 24 * 7 : 60 * 60 * 2;

  const cookie = await commitSession(session, { maxAge });
  console.log(cookie);

  // commit the session
  let headers = new Headers({ "Set-Cookie": cookie });
  return redirect(returnUrl, { headers });


}

const Signin = () => {
  const form = useRemixForm<SiginFormSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(siginFormSchema),
    defaultValues: {
      password: "",
      email: "",
      remember: false,
    },
  })

  return (
    <div className="flex flex-col justify-center items-center h-full w-full ">
      <div className="flex items-center justify-center sm:mt-16">
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-16" />
        </Link>
      </div>
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mt-2">
        <BeringForm {...form} method="post" formSchema={siginFormSchema} className="space-y-8">
          <CardHeader className="bg-primary/30 p-2 sm:h-20 sm:p-6">
            <CardTitle className="text-center">登录</CardTitle>
            <CardDescription className="text-center">
              请输入您的邮箱和密码登录
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:px-16" >
            <InputFormItem name="email" label="邮箱" />
            <InputFormItem type="password" name="password" label="密码" />
            <CheckBoxFormItem name="remember" label="记住我" />
          </CardContent>
          <CardFooter>
            <SubmitButton className="w-full" submittingContent="登录中...">登录</SubmitButton>
          </CardFooter>
        </BeringForm>
      </Card>
      <div className="text-sm text-gray-500 mt-4">
        没有账号？<Link to="/sign-up" className="text-blue-500">注册</Link>
      </div>
    </div>
  )
}

export default Signin;
