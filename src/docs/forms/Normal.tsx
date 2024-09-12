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
    CheckBoxGroupFormItem,
    DatePickerFormItem,
    RadioGroupFormItem,
    SelectFormItem,
    SwitchFormItem,
    TextareaFormItem,
    ComboboxFormItem,
    SliderFormItem,
    RadioListFormItem,
    CheckboxListFormItem,
    SegmentedFormItem,
    AddonInputFormItem
} from "@/components/forms"
import { ICheckBoxGroupOption } from "@/components/forms/CheckBoxGroupFormItem"
import { IRadioGroupItem } from "@/components/forms/RadioGroupFormItem"
import { BadgeJapaneseYen, CreditCard, HandCoins } from "lucide-react"

const sexs: IRadioGroupItem[] = [
    {
        value: "male",
        label: "男",
    },
    {
        value: "female",
        label: "女",
        disabled: true
    },
    {
        value: "none",
        label: "保密",
        description: "不公开性别"
    },
]

const items: ICheckBoxGroupOption[] = [
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
]


const fruits = [
    { value: "apple", label: "苹果" },
    { value: "banana", label: "香蕉" },
    { value: "blueberry", label: "蓝莓", disabled: true },
    { value: "grapes", label: "葡萄" },
    { value: "pineapple", label: "菠萝" },
]

const languages = [
    { value: "zh", label: "中文" },
    { value: "en", label: "英语" },
    { value: "ja", label: "日语" },
]

const roles = [
    { value: "admin", label: <div className="flex items-center gap-1"><CreditCard /> Administrator</div> },
    { value: "manager", label: <div className="flex items-center gap-1"><BadgeJapaneseYen />Manager</div> },
    { value: "guest", label: <div className="flex items-center gap-1"><HandCoins />Guest</div>, disabled: true }
]

const formSchema = z.object({
    username: z.string().min(2).max(10),
    password: z.string().min(2).max(10),
    email: z.union([z.string().email().optional(), z.literal("")]),
    homepage: z.string().url().optional(),
    birth: z.date({ required_error: "请选择您的出生日期" })
        .min(new Date("2024-01-01"), { message: "出生日期不能早于2024-01-01" })
        .max(new Date("2024-12-31"), { message: "出生日期不能晚于2024-12-31" })
        .optional(),
    sex: z.enum(["male", "female", "none"]),
    fruit: z.string(),
    remember: z.boolean().optional(),
    remember1: z.boolean().optional(),
    language: z.string(),
    age: z.number().min(18).max(60),
    role: z.string(),
    roles: z.array(z.string())
        .refine((value) => value?.length > 0, {
            message: "请至少选择一个角色",
        }),
    role2: z.string(),
    menus: z.array(z.string())
        .refine((value) => value?.length > 0, {
            message: "请至少选择一个菜单",
        }),
    menus2: z.array(z.string())
        .refine((value) => value?.length > 1, {
            message: "请至少选择两个菜单",
        }),
    description: z.string().min(2).max(100).optional(),
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
            age: 20,
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
                <AddonInputFormItem type="url" name="homepage" label="主页" placeholder="请输入您的个人主页" addonBefore="https://" addonAfter=".com" />
                <DatePickerFormItem name="birth" label="生日" />
                <CheckBoxFormItem name="remember" label="记住我" description="7天内免登录" help="帮助信息" />
                <SwitchFormItem name="remember1" label="记住我" description="7天内免登录" />
                <RadioGroupFormItem name="sex" label="性别" options={sexs} inline />
                <RadioListFormItem name="role" label="角色" options={roles} />
                <CheckboxListFormItem name="roles" label="角色" options={roles} />
                <SegmentedFormItem name="role2" label="角色" options={roles} />
                <SelectFormItem name="fruit" label="爱好" options={fruits} description="选择您喜欢的食物" />
                <ComboboxFormItem name="language" label="语言" options={languages} description="选择您喜欢的语言" />
                <SliderFormItem name="age" label="年龄" min={10} max={60} />
                <CheckBoxGroupFormItem name="menus" label="菜单" description="请勾选启用的菜单" options={items} help="帮助信息" />
                <CheckBoxGroupFormItem name="menus2" label="菜单" description="横向" inline options={items.slice(0, 3)} help="帮助信息" />
                <TextareaFormItem name="description" label="描述" placeholder="请输入自我介绍" description="请输入您的描述" help="帮助信息" />
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
