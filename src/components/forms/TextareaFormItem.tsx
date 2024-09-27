import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { IFormItemProps } from "./types"
import Help from "./_Help"

export interface ITextareaProps extends IFormItemProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
}

const TextareaFormItem = ({
    name,
    label,
    className,
    placeholder,
    description,
    help,
    ...props
}: ITextareaProps) => {
    const { control } = useRemixFormContext()
    const { formSchema } = useBeringFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
                        {label ?? name}
                        <Help>{help}</Help>
                    </FormLabel>
                    <FormControl>
                        <ShadcnTextarea placeholder={placeholder} {...props} {...field} className="bg-input-background" />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default TextareaFormItem
