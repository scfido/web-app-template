import { useTitle } from "ahooks"
import { ComponentPreview } from ".."
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "@/lib/zod-cn"
import { Button } from "@/components/ui/button"
import {
    ZodForm,
    SliderFormItem
} from "@/components/forms"
import { useEffect, useState } from "react"


const createFormSchema = (min: number, max: number) => z.object({
    max: z.number().min(min).max(100),
    min: z.number().min(10).max(max),
    value: z.number(),
})
    .refine(
        ({ max, min, value }) => value >= min && value <= max,
        {
            message: `值必须在${min}和${max}之间`,
            path: ["value"], // 指定错误路径
        }
    );


export function DynamicValidationForm() {
    // 1. Define your form.
    const defaultValues = {
        max: 100,
        min: 10,
        value: 20,
    }

    const [minimum, setMinimum] = useState(defaultValues.min)
    const [maximum, setMaximum] = useState(defaultValues.max)
    const formSchema = createFormSchema(minimum, maximum)

    type FormDataType = z.infer<typeof formSchema>
    const form = useForm<FormDataType>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    useEffect(() => {
        const { unsubscribe } = form.watch((formData, { name, type }) => {
            console.log(formData, name, type)

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
        <ZodForm {...form} formSchema={formSchema}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <SliderFormItem name="max" label="最大值" min={minimum} max={100} />
                <SliderFormItem name="min" label="最小值" min={10} max={maximum} />
                <SliderFormItem name="value" label="值" min={minimum} max={maximum} />
                <Button type="submit">Submit</Button>
            </form>
        </ZodForm>
    )
}

const Component = () => {
    useTitle("表单")

    return (
        <article className="" >
            <h1>动态验证</h1>
            <ComponentPreview title="值的范围受最大值和最小值动态限制">
                <DynamicValidationForm />
            </ComponentPreview>
        </article>
    )
}

export default Component
