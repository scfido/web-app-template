import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { IFormItemProps } from "@/components/forms/types"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import Help from "./_Help"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Key, ReactNode } from "react"

export interface ISegmentedOption {
  key?: Key
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface ISegmentedFormItemProps extends IFormItemProps {
  options: ISegmentedOption[]
  defaultValue?: string
}

const SegmentedFormItem = ({
  options,
  name,
  label,
  help,
  description,
  className,
}: ISegmentedFormItemProps) => {
  const { control } = useRemixFormContext()
  const { formSchema } = useBeringFormContext()
  const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
            {label ?? name}
            <Help>{help}</Help>
          </FormLabel>
          <FormControl>

            <RadioGroup
              className="inline-flex h-12 items-stretch justify-around w-full border border-input rounded-md bg-input-background p-1"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              {options.map((option) => (
                <FormItem key={option.value} className="flex-1 space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      className="peer sr-only"
                      disabled={option.disabled}
                    />
                  </FormControl>
                  <FormLabel
                    className={cn(
                      "flex h-10 w-full cursor-pointer items-center justify-center text-foreground rounded-sm px-3 text-sm font-normal peer-data-[state=checked]:font-medium",
                      "peer-data-[state=checked]:bg-accent-background peer-data-[state=checked]:border-accent peer-data-[state=checked]:border peer-data-[state=checked]:text-accent-foreground",
                      { "hover:bg-accent-hover": !option.disabled },
                      { "cursor-not-allowed text-muted-foreground": option.disabled }
                    )}
                  >
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

export default SegmentedFormItem;
