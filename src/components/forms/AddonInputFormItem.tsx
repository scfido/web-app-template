import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Input as ShadcnInput } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { IFormItemProps } from "./types"
import Help from "./_Help"

export interface IAddonInputProps extends IFormItemProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
    type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week"
    addonAfter?: string
    addonBefore?: string
}

const InputFormItem = ({
    name,
    label,
    className,
    placeholder,
    description,
    help,
    addonAfter,
    addonBefore,
    ...props
}: IAddonInputProps) => {
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
                    <div
                        className="group flex items-center h-10 w-full rounded-md border border-input bg-input-background px-3 text-sm ring-offset-background  focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        {addonBefore && <span className=" bg-input-background  py-2 mr-2">{addonBefore}</span>}
                        <FormControl>
                            <ShadcnInput
                                placeholder={placeholder}
                                {...props}
                                {...field}
                                className="h-9 border-0 ring-0 outline-none p-0 m-0 bg-input-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </FormControl>
                        {addonAfter && <span className=" py-2 ml-2">{addonAfter}</span>}
                    </div>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default InputFormItem
