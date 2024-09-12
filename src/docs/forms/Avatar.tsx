import { useTitle } from "ahooks"
import { ComponentPreview } from ".."
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "@/lib/zod-cn"
import { Button } from "@/components/ui/button"
import {
    ZodForm,
    InputFormItem,
    TextareaFormItem,
    AvatarFormItem
} from "@/components/forms"


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['jpg', 'png'];

const fileSchema = z
    .any()
    .refine(file => file instanceof File, { message: '上传的文件无效' })
    .refine(file => file?.size <= MAX_FILE_SIZE, { message: '文件大小不能超过5MB' })
    .refine(
        file => {
            const fileType = file?.name?.split('.').pop() ?? '';
            return ALLOWED_FILE_TYPES.includes(fileType);
        },
        { message: `只支持 ${ALLOWED_FILE_TYPES.join(', ')} 格式的文件` }
    );

const formSchema = z.object({
    username: z.string().optional(),
    avatar: fileSchema.optional(),
    description: z.string().min(2).max(100).optional(),
})

export function AvatarForm() {
    // 1. Define your form.
    type Schema = z.infer<typeof formSchema>
    const form = useForm<Schema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
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
                <AvatarFormItem name="avatar" label="头像" allowedFileTypes={ALLOWED_FILE_TYPES} />
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
            <h1>头像</h1>
            <ComponentPreview title="用户头像、图标等场景">
                <AvatarForm />
            </ComponentPreview>
        </article>
    )
}

export default Component
