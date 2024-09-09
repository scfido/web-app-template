import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"
import { useZodFormContext } from "@/components/forms/ZodForm"
import { IFormItemProps } from "./types"
import Help from "./_Help"

export interface ISliderFormItemProps extends Omit<IFormItemProps, "placeholder"> {
    defaultValue?: number
    min?: number
    max?: number
    step?: number
}

const SliderFormItem = ({
    name,
    label,
    className,
    description,
    help,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
}: ISliderFormItemProps) => {
    const { control } = useFormContext()
    const { formSchema } = useZodFormContext()
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
                        <div className="flex items-center gap-1">
                            <Slider
                                className="flex-1"
                                defaultValue={[defaultValue]}
                                max={max}
                                min={min}
                                step={step}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                            />
                            <span
                                className="min-w-10 text-right text-sm text-muted-foreground"
                            >{field.value ?? defaultValue}</span>
                        </div>
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

export default SliderFormItem
