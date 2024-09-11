import { cn } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form"
import { useZodFormContext } from "@/components/forms/ZodForm"
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
    items: IRadioListItem[]
}

const RadioGroupFormItem = ({
    name,
    label,
    items,
    className,
    description,
    disabled,
    help,
}: IRadioListFormItemProps) => {
    const { control } = useFormContext()
    const { formSchema } = useZodFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填

    const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState, item: IRadioListItem, field: ControllerRenderProps<FieldValues, string>) => {
        if (checked) {
            if (!field.value) {
                field.onChange([item.value])
            } else {
                field.onChange([...field.value, item.value])
            }
        } else {
            field.onChange(
                field.value?.filter(
                    (value: string) => value !== item.value
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
                            {items.map((item) => (
                                <FormItem
                                    key={item.value}
                                    className={cn("flex border rounded min-h-12 space-y-0",
                                        field.value === item.value ? "bg-primary/10 border-primary" : "bg-background"
                                    )}>
                                    <div className="flex items-center justify-center w-12">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={item.value}
                                                disabled={disabled || item.disabled}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormLabel className={cn("flex flex-1 items-center text-foreground cursor-pointer font-normal",
                                        { "cursor-not-allowed text-muted-foreground": disabled || item.disabled }
                                    )}>
                                        {item.label}
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

