import { ComponentPreview } from "@/docs"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "@/lib/zod-cn"
import {
    BeringForm,
    InputFormItem,
    TextareaFormItem,
    AvatarFormItem
} from "@/components/forms"
import { SubmitButton } from "@/components/forms"
import { useRemixForm } from "remix-hook-form"


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

export async function action() {
    return {
        success: true
    }
}

export function AvatarForm() {
    // 1. Define your form.
    type Schema = z.infer<typeof formSchema>
    const form = useRemixForm<Schema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    return (
        <BeringForm method="post" {...form} formSchema={formSchema} className="space-y-8">
            <InputFormItem name="username" label="用户名" />
            <AvatarFormItem name="avatar" label="头像" allowedFileTypes={ALLOWED_FILE_TYPES} />
            <TextareaFormItem name="description" label="描述" placeholder="请输入自我介绍" description="请输入您的描述" help="帮助信息" />
            <SubmitButton>Submit</SubmitButton>
        </BeringForm>
    )
}


const Component = () => {

    return (
        <article >
            <h1 className="mb-4">头像</h1>
            <ComponentPreview title="用户头像、图标等场景">
                <AvatarForm />
            </ComponentPreview>
        </article>
    )
}

export default Component
