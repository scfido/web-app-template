import { cn } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Checkbox } from "@/components/ui/checkbox"
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form"
import { useZodFormContext } from "@/components/forms/ZodForm"
import { Key } from "react"
import { IFormItemProps } from "./types"
import Help from "./_Help"

export interface ICheckBoxGroupOption {
  key?: Key
  value: string;
  label?: string;
  description?: string
  disabled?: boolean
}

export interface ICheckBoxGroupFormItemProps extends IFormItemProps, React.HTMLAttributes<HTMLDivElement> {
  options: ICheckBoxGroupOption[]
  inline?: boolean
}

const CheckBoxGroupFormItem = ({
  name,
  label,
  options,
  className,
  description,
  disabled,
  inline,
  help,
  ...props
}: ICheckBoxGroupFormItemProps) => {
  const { control } = useFormContext()
  const { formSchema } = useZodFormContext()
  const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填

  const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState, option: ICheckBoxGroupOption, field: ControllerRenderProps<FieldValues, string>) => {
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
          <div className={cn("flex flex-col gap-1 ml-4", { "flex-row gap-3": inline })}>
            {options.map((option) => (
              <FormItem
                key={option.key ?? option.value}
                className={cn("flex flex-row space-x-3 space-y-0", { "space-x-1": inline })}
              >
                <FormControl>
                  <Checkbox
                    onBlur={field.onBlur}
                    checked={field.value?.includes(option.value)}
                    onCheckedChange={(checked) => handleCheckedChange(checked, option, field)}
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
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CheckBoxGroupFormItem
