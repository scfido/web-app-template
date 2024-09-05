import { SelectProps } from "@radix-ui/react-select";
import { Key } from "react";
import { Select, SelectItem, SelectSeparator, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";


const selectVariants = cva(
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

export interface ISelectOptionGroup {
    key: Key
    label: string
    options: ISelectOption[]
}

export interface ISelectSeparator {
    key: Key
    label: string
}

export interface ISelectOption {
    key?: Key
    label?: string;
    value: string
    disabled?: boolean
}

export type SelectOptionType = ISelectSeparator | ISelectOption | ISelectOptionGroup


export function isSelectOption(option: SelectOptionType): option is ISelectOption {
    return (option as ISelectOption).value !== undefined;
}

export function isSelectOptionGroup(option: SelectOptionType): option is ISelectOptionGroup {
    return (option as ISelectOptionGroup).label !== undefined &&
        (option as ISelectOptionGroup).options !== undefined
}

export function isSelectSeparator(option: SelectOptionType): option is ISelectSeparator {
    return option.label === '---'
}

export function renderSelectOption(options: SelectOptionType[]) {
    return options?.map((option) => {
        if (isSelectOption(option)) {
            return (
                <SelectItem
                    className={cn(option.disabled && "text-gray-500")}
                    key={option.key ?? option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label ?? option.value}
                </SelectItem>
            )
        }
        else if (isSelectOptionGroup(option)) {
            return (
                <SelectGroup key={option.key}>
                    <SelectLabel className="text-sm font-medium text-gray-500 pl-4">{option.label}</SelectLabel>
                    {option.options?.map((option) => {
                        return (
                            <SelectItem
                                className={cn(option.disabled && "text-gray-500")}
                                key={option.key ?? option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label ?? option.value}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            )
        }
        else if (isSelectSeparator(option)) {
            return <SelectSeparator key={option.key} />
        }
    })
}


export interface ISelectProps extends SelectProps {
    options?: SelectOptionType[]
    placeholder?: string
    className?: string
    size?: "sm" | "default" | "lg"
}

const Component = ({
    options,
    size,
    placeholder,
    className,
    ...props
}: ISelectProps) => {

    return (
        <Select {...props} >
            <SelectTrigger className={cn(selectVariants({ size, className }))}>
                <SelectValue className="font-bold " placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options && renderSelectOption(options)}
            </SelectContent>
        </Select>
    )
}

export default Component
