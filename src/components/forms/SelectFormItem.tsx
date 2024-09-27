import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { IFormItemProps } from "./types"
import Help from "./_Help"
import { renderSelectOption, SelectOptionType } from "@/components/Select"
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface ISelectFormItemProps extends IFormItemProps {
    options: SelectOptionType[]
}

const SelectFormItem = ({
    name,
    label,
    className,
    placeholder,
    description,
    help,
    options,
    ...props
}: ISelectFormItemProps) => {
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options && renderSelectOption(options)}
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default SelectFormItem
