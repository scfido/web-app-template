import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { IFormItemProps } from "./types"
import Help from "./_Help"
import { Switch } from "@/components/ui/switch"

export interface ISwitchProps extends IFormItemProps {
}

const SwitchFormItem = ({
    name,
    label,
    className,
    description,
    disabled,
    help,
}: ISwitchProps) => {
    const { control } = useRemixFormContext()
    const { formSchema } = useBeringFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border bg-input-background p-4", className)}>
                    <div className="space-y-0.5">
                        <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
                            {label ?? name}
                            <Help>{help}</Help>
                        </FormLabel>
                        <FormDescription>
                            {description}
                        </FormDescription>
                        <FormMessage />
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default SwitchFormItem
