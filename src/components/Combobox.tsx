import { Key, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator
} from "@/components/ui/command"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";


const comboboxVariants = cva(
    "",
    {
        variants: {
            size: {
                default: "h-10 ",
                sm: "h-9 ",
                lg: "h-11",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

export interface IComboboxOptionGroup {
    key: Key
    label: string
    options: IComboboxOption[]
}

export interface IComboboxSeparator {
    key: Key
    label: string
}

export interface IComboboxOption {
    key?: Key
    label?: string;
    value: string
    disabled?: boolean
}

export type ComboboxOptionType = IComboboxSeparator | IComboboxOption | IComboboxOptionGroup


export function isComboboxOption(option: ComboboxOptionType): option is IComboboxOption {
    return (option as IComboboxOption).value !== undefined;
}

export function isComboboxOptionGroup(option: ComboboxOptionType): option is IComboboxOptionGroup {
    return (option as IComboboxOptionGroup).label !== undefined &&
        (option as IComboboxOptionGroup).options !== undefined
}

export function isComboboxSeparator(option: ComboboxOptionType): option is IComboboxSeparator {
    return option.label === '---'
}

export function renderComboboxOption(options: ComboboxOptionType[], selectedValue?: string, onChange?: (value: string) => void) {
    return options?.map((option) => {
        if (isComboboxOption(option)) {
            return (
                <CommandItem
                    className={cn(option.disabled && "text-muted-foreground")}
                    key={option.key ?? option.value}
                    value={option.value}
                    keywords={[option.label ?? option.value]}
                    disabled={option.disabled}
                    onSelect={() => onChange?.(option.value)}
                >
                    <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            option.value === selectedValue
                                ? "opacity-100"
                                : "opacity-0"
                        )}
                    />
                    {option.label ?? option.value}
                </CommandItem>
            )
        }
        else if (isComboboxOptionGroup(option)) {
            return (
                <CommandGroup key={option.key} heading={option.label}>
                    {option.options?.map((option) => {
                        return (
                            <CommandItem
                                key={option.key ?? option.value}
                                value={option.value}
                                keywords={[option.label ?? option.value]}
                                disabled={option.disabled}
                                onSelect={() => onChange?.(option.value)}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        option.value === selectedValue
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {option.label ?? option.value}
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            )
        }
        else if (isComboboxSeparator(option)) {
            return <CommandSeparator key={option.key} />
        }
    })
}

export const findOption = (value: string, options?: ComboboxOptionType[]) => {
    if (!options)
        return

    return options?.find(
        (option) => {
            if (isComboboxOption(option)) {
                return option.value === value
            }
            else if (isComboboxOptionGroup(option)) {
                return option.options?.find(
                    (option) => option.value === value
                )
            }
        }
    )
}

export interface IComboboxProps {
    options?: ComboboxOptionType[]
    placeholder?: string
    className?: string
    size?: "sm" | "default" | "lg"
    searchPlaceholder?: string
    empty?: string
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    disabled?: boolean
}

const Component = ({
    options,
    size,
    placeholder = "请选择",
    className,
    searchPlaceholder = "请输入关键词搜索",
    empty = "未找到搜索内容",
    value: valueProp,
    defaultValue,
    onChange,
    disabled
}: IComboboxProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(defaultValue)
    const selectedValue = valueProp ?? value

    const handleSelect = (value: string) => {
        setOpen(false)
        setValue(value)
        onChange?.(value)
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-[200px] justify-between bg-input-background",
                        !value && "text-muted-foreground",
                        comboboxVariants({ size, className }),
                    )}
                    aria-expanded={open}
                    disabled={disabled}
                >
                    {selectedValue
                        ? findOption(selectedValue, options)?.label ?? selectedValue
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command >
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{empty}</CommandEmpty>
                        {options && renderComboboxOption(options, selectedValue, handleSelect)}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Component
