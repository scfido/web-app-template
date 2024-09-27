import { cn } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { Key } from "react"
import { IFormItemProps } from "./types"
import Help from "./_Help"

export interface IRadioGroupItem {
    key?: Key
    value: string;
    label?: string;
    description?: string
    disabled?: boolean
}

export interface IRadioGroupFormItemProps extends IFormItemProps, React.HTMLAttributes<HTMLDivElement> {
    options: IRadioGroupItem[]
    inline?: boolean
}

const RadioGroupFormItem = ({
    name,
    label,
    options,
    className,
    description,
    disabled,
    inline,
    help,
    ...props
}: IRadioGroupFormItemProps) => {
    const { control } = useRemixFormContext()
    const { formSchema } = useBeringFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem {...props}>
                    <div className={cn("space-y-1", className)}>
                        <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
                            {label ?? name}
                            <Help>{help}</Help>
                        </FormLabel>
                        <FormDescription>
                            {description}
                        </FormDescription>
                    </div>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={cn("flex flex-col space-y-1", { "flex-row gap-3": inline })}
                        >
                            <div className={cn("flex flex-col gap-1 ml-4", { "flex-row gap-3": inline })}>
                                {options.map((option) => (
                                    <FormItem
                                        key={option.key ?? option.value}
                                        className={cn("flex flex-row space-x-3 space-y-0", { "space-x-1": inline })}
                                    >
                                        <FormControl>
                                            <RadioGroupItem
                                                value={option.value}
                                                disabled={disabled || option.disabled}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className={cn("font-normal", { "text-muted-foreground": disabled || option.disabled })}>
                                                {option.label}
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                {option.description}
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                ))}
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RadioGroupFormItem

