import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { IFormItemProps } from "./types"
import Help from "./_Help"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Check } from "lucide-react"
import { useState } from "react"
import { ComboboxOptionType, findOption, renderComboboxOption } from "@/components/Combobox"


export interface IComboboxFormItemProps extends IFormItemProps {
    /** 搜索框的占位符 */
    searchPlaceholder?: string
    /** 没有搜索到结果时显示的文本或组件 */
    empty?: React.ReactNode
    options: ComboboxOptionType[]
}

const ComboboxFormItem = ({
    name,
    label,
    className,
    placeholder = "请选择",
    searchPlaceholder = "请输入关键词搜索",
    empty = "未找到搜索内容",
    description,
    help,
    options,
}: IComboboxFormItemProps) => {
    const { control } = useRemixFormContext()
    const { formSchema } = useBeringFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填
    const [open, setOpen] = useState(false)

    const handleChange = (value: string, onChange) => {
        onChange(value)
        setOpen(false)
    }

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
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    aria-expanded={open}
                                >
                                    {field.value
                                        ? findOption(field.value, options)?.label ?? field.value
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command >
                                <CommandInput placeholder={searchPlaceholder} />
                                <CommandList>
                                    <CommandEmpty>{empty}</CommandEmpty>
                                    {renderComboboxOption(options, field.value, value => handleChange(value, field.onChange))}
                                </CommandList>
                            </Command>
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

export default ComboboxFormItem
