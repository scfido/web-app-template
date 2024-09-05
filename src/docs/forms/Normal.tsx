import { useTitle } from "ahooks"
import { ComponentPreview } from ".."
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "@/lib/zod-cn"
import { Button } from "@/components/ui/button"
import {
    ZodForm,
    InputFormItem,
    CheckBoxFormItem,
    CheckBoxGroupFormItem
} from "@/components/forms"
import { ICheckBoxGroupItem } from "@/components/forms/CheckBoxGroupFormItem"
import DatePickerFormItem from "@/components/forms/DatePickerFormItem"

const items: ICheckBoxGroupItem[] = [
    {
        value: "recents",
        label: "Recents",
    },
    {
        value: "home",
        label: "Home",
    },
    {
        value: "applications",
        label: "Applications",
        description: "应用程序描述"
    },
    {
        value: "desktop",
        label: "Desktop",
        disabled: true,
        description: "被禁用的菜单"
    },
    {
        value: "downloads",
        label: "Downloads",
    },
    {
        value: "documents",
        label: "Documents",
    },
] as const

const formSchema = z.object({
    username: z.string().min(2).max(10),
    password: z.string().min(2).max(10),
    email: z.string().email().optional(),
        birth: z.date({required_error:"请选择您的出生日期"})
        .min(new Date("2024-01-01"),{message:"出生日期不能早于2024-01-01"})
        .max(new Date("2024-12-31"),{message:"出生日期不能晚于2024-12-31"})
        .optional(),
    remember: z.boolean().optional(),
    menus: z.array(z.string())
        .refine((value) => value?.length > 0, {
            message: "请至少选择一个菜单",
        }),
    menus2: z.array(z.string())
        .refine((value) => value?.length > 1, {
            message: "请至少选择两个菜单",
        }),
})


export function ProfileForm() {
    // 1. Define your form.
    type Schema = z.infer<typeof formSchema>
    const resolver = zodResolver(formSchema)
    const form = useForm<Schema>({
        resolver,
        defaultValues: {
            username: "",
            password: "",
            email: "",
            remember: true,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: Schema) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <ZodForm {...form} formSchema={formSchema}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <InputFormItem name="username" label="用户名" />
                <InputFormItem type="password" name="password" label="密码" help="帮助信息" />
                <InputFormItem type="email" name="email" label="邮箱" description="我们不会公开您的邮箱地址" help="帮助信息" />
                <DatePickerFormItem name="birth" label="生日" />
                <CheckBoxFormItem name="remember" label="记住我" description="7天内免登录" help="帮助信息" />
                <CheckBoxGroupFormItem name="menus" label="菜单" description="请勾选启用的菜单" items={items} help="帮助信息" />
                <CheckBoxGroupFormItem name="menus2" label="菜单" description="横向" inline items={items.slice(0, 3)} help="帮助信息" />
                <Button type="submit">Submit</Button>
            </form>
        </ZodForm>
    )
}

const Component = () => {
    useTitle("表单")

    return (
        <article className="" >
            <h1>表单</h1>
            <ComponentPreview title="示例">
                <ProfileForm />
            </ComponentPreview>
        </article>
    )
}

export default Component
