import { cn } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { useZodFormContext } from "@/components/forms/ZodForm"
import Help from "./_Help"
import { IFormItemProps } from "./types"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import dayjs from "dayjs"
import { zhCN } from "date-fns/locale";

export interface IDatePickerFormItemProps extends IFormItemProps, React.HTMLAttributes<HTMLDivElement> {
}

const DatePickerFormItem = ({
    name,
    label,
    className,
    description,
    placeholder = "请选择日期",
    disabled,
    help,
    ...props
}: IDatePickerFormItemProps) => {
    const { control } = useFormContext()
    const { formSchema } = useZodFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填
    const maxDate = formSchema.shape[name]?.maxDate ?? new Date()
    const minDate = formSchema.shape[name]?.minDate ?? new Date("1900-01-01")

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem {...props} className={className}>
                    <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
                        {label ?? name}
                        <Help>{help}</Help>
                    </FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        dayjs(field.value).format("YYYY年MM月DD日")
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                locale={zhCN}
                                mode="single"
                                required={isRequired}
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > maxDate || date < minDate
                                }
                            />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />

                </FormItem>
            )}
        />
    )
}

export default DatePickerFormItem

