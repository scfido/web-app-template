import { ComponentPreview } from "@/docs"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "@/lib/zod-cn"
import {
    BeringForm,
    SliderFormItem,
    SubmitButton
} from "@/components/forms"
import { useEffect, useState } from "react"
import { getValidatedFormData, useRemixForm, validateFormData } from "remix-hook-form"
import { ActionFunctionArgs, json } from "@remix-run/node"


const defaultValues = {
    max: 100,
    min: 10,
    value: 20,
}

const createFormSchema = (min: number, max: number) => z.object({
    max: z.coerce.number().min(min).max(100),
    min: z.coerce.number().min(10).max(max),
    value: z.coerce.number({
        required_error: "值不能为空",
        invalid_type_error: "值必须是数字",
    }),
})
    .refine(
        ({ max, min, value }) => value >= min && value <= max,
        {
            message: `值必须在${min}和${max}之间`,
            path: ["value"], // 指定错误路径
        }
    );

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const minmum = Number(formData.get("min") ?? defaultValues.min)
    const maximum = Number(formData.get("max") ?? defaultValues.max)
    const formSchema = createFormSchema(minmum, maximum)
    type FormDataType = z.infer<typeof formSchema>
    const {
        errors,
        data,
    } = await validateFormData<FormDataType>(formData, zodResolver(formSchema))

    if (errors) {
        // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
        return json({ errors, defaultValues: data });
    }

    // Do something with the data
    return json({result: "success"});
}


export function DynamicValidationForm() {
    // 1. Define your form.
    const [minimum, setMinimum] = useState(defaultValues.min)
    const [maximum, setMaximum] = useState(defaultValues.max)
    const formSchema = createFormSchema(minimum, maximum)
    type FormDataType = z.infer<typeof formSchema>
    const form = useRemixForm<FormDataType>({
        resolver: zodResolver(formSchema),
        submitHandlers: {
           // onValid: onSubmit  // 在浏览器端获取数据
        },
        defaultValues
    })

    useEffect(() => {
        const { unsubscribe } = form.watch((formData, { name, type }) => {

            if (name === "min") {
                setMinimum(formData.min ?? defaultValues.min)
            }
            else if (name === "max") {
                setMaximum(formData.max ?? defaultValues.max)
            }
        })

        return unsubscribe
    }, [form.watch])


    // 2. Define a submit handler.
    function onSubmit(values: FormDataType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <BeringForm method="post" {...form} formSchema={formSchema} className="space-y-8">
            <SliderFormItem name="max" label="最大值" min={minimum} max={100} />
            <SliderFormItem name="min" label="最小值" min={10} max={maximum} />
            <SliderFormItem name="value" label="值" min={minimum} max={maximum} />
            <SubmitButton>Submit</SubmitButton>
        </BeringForm>
    )
}

const Component = () => {

    return (
        <article >
            <h1 className="mb-4">动态验证</h1>
            <ComponentPreview title="值的范围受最大值和最小值动态限制">
                <DynamicValidationForm />
            </ComponentPreview>
        </article>
    )
}

export default Component
