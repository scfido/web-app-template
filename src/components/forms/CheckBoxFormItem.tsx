import { cn } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useFormContext } from "react-hook-form"
import { useZodFormContext } from "@/components/forms/ZodForm"
import Help from "./_Help"
import { IFormItemProps } from "./types"

export interface ICheckBoxFormItemProps extends IFormItemProps, React.HTMLAttributes<HTMLDivElement> {
}

const CheckBoxFormItem = ({
    name,
    label,
    className,
    description,
    disabled,
    help,
    ...props
}: ICheckBoxFormItemProps) => {
    const { control } = useFormContext()
    const { formSchema } = useZodFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填
  
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem {...props} className={cn("flex flex-row items-start space-x-3 space-y-0 rounded-md", className)}>
                    <FormControl>
                        <Checkbox
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
                            {label ?? name}
                            <Help>{help}</Help>
                        </FormLabel>
                        <FormDescription>
                            {description}
                        </FormDescription>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    )
}

export default CheckBoxFormItem
