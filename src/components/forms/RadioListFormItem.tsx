import { cn } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { Key, ReactNode } from "react"
import { IFormItemProps } from "./types"
import Help from "./_Help"

export interface IRadioListItem {
    key?: Key
    value: string;
    label: ReactNode;
    disabled?: boolean;
}

export interface IRadioListFormItemProps extends IFormItemProps {
    options: IRadioListItem[]
}

const RadioGroupFormItem = ({
    name,
    label,
    options,
    description,
    disabled,
    help,
}: IRadioListFormItemProps) => {
    const { control } = useRemixFormContext()
    const { formSchema } = useBeringFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填

    const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState, option: IRadioListItem, field: ControllerRenderProps<FieldValues, string>) => {
        if (checked) {
            if (!field.value) {
                field.onChange([option.value])
            } else {
                field.onChange([...field.value, option.value])
            }
        } else {
            field.onChange(
                field.value?.filter(
                    (value: string) => value !== option.value
                )
            )
        }
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
                        {label ?? name}
                        <Help>{help}</Help>
                    </FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={cn("flex flex-col gap-1")}
                        >
                            {options.map((option) => (
                                <FormItem
                                    key={option.value}
                                    className={cn("flex border rounded min-h-12 space-y-0",
                                        { "hover:bg-accent-hover": !option.disabled },
                                        field.value === option.value ? "bg-accent-background text-accent-foreground border-accent" : "bg-input-background"
                                    )}>
                                    <div className="flex items-center justify-center w-12">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={option.value}
                                                disabled={disabled || option.disabled}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormLabel className={cn("flex flex-1 items-center text-foreground cursor-pointer font-normal",
                                        { "cursor-not-allowed text-muted-foreground": disabled || option.disabled }
                                    )}>
                                        {option.label}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
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

export default RadioGroupFormItem

