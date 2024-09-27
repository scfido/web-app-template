import { CheckBoxFormItem, InputFormItem, BeringForm } from "@/components/forms"
import { SubmitButton } from "@/components/forms/SubmitButton";
import { Button } from "@/components/ui/button"
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
import { ActionFunctionArgs } from "@remix-run/node";
import { json, Link, redirect, useNavigate } from "@remix-run/react";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";

// 表单架构
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  remember: z.boolean().optional(),
})
type FormSchemaType = z.infer<typeof formSchema>

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues
  } = await getValidatedFormData<FormSchemaType>(request, zodResolver(formSchema));

  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    return json({ errors, defaultValues });
  }

  // 模拟登录
  await new Promise(resolve => setTimeout(resolve, 1000))

  if (data.password !== "11111111") {
    return json({
      errors: {
        password: { message: "邮箱或密码错误" },
      },
      defaultValues: data,
    });
  }
  // Do something with the data
  return redirect("/");
}

const Signin = () => {
  const form = useRemixForm<FormSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
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
        <BeringForm {...form} method="post" formSchema={formSchema} className="space-y-8">
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
