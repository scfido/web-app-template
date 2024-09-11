import { CheckBoxFormItem, InputFormItem, ZodForm } from "@/components/forms"
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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// 注册表单架构
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  confirmPassword: z.string().min(8).max(32),
  agreement: z.boolean().refine((data) => data, {
    message: "您必须同意用户协议和隐私政策。",
  }),
})
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "两次输入的密码不一致。",
    path: ["confirmPassword"],
  });

const Signup = () => {
  type Schema = z.infer<typeof formSchema>
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: "",
      agreement: false,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: Schema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full ">
      <div className="flex items-center justify-center sm:mt-16">
        <img src="/logo.svg" alt="logo" className="h-16" />
      </div>
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mt-2">
        <ZodForm {...form} formSchema={formSchema}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader className="bg-primary/30 p-2 sm:h-20 sm:p-6">
              <CardTitle className="text-center">注册</CardTitle>
              <CardDescription className="text-center">
                注册一个新账号
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:px-16" >
              <InputFormItem name="email" label="邮箱" />
              <InputFormItem type="password" name="password" label="密码" />
              <InputFormItem type="password" name="confirmPassword" label="确认密码" />
              <CheckBoxFormItem name="agreement" label="同意用户协议和隐私政策" />
            </CardContent>
            <CardFooter>
              <Button className="w-full">注册</Button>
            </CardFooter>
          </form>
        </ZodForm>
      </Card>
      <div className="text-sm text-gray-500 mt-4">
        已有账号？<Link to="/login" className="text-blue-500">登录</Link>
      </div>
    </div>
  )
}

export default Signup;
