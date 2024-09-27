import React from "react";
import { FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";
import { z, ZodEffects } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRemixForm, RemixFormProvider } from "remix-hook-form";
import { Form as RemixForm } from "@remix-run/react";
import { useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RemixFormProps } from "@remix-run/react/dist/components";
type TestArgsType = Parameters<typeof zodResolver>[0];

interface IBeringFormContextValue {
    formSchema: z.AnyZodObject
}

const BeringFormContext = React.createContext<IBeringFormContextValue>({} as IBeringFormContextValue)

export function useBeringFormContext() {
    return React.useContext(BeringFormContext)
}

type UseRemixFormReturnType<T extends FieldValues> = ReturnType<typeof useRemixForm<T>>

export interface IBeringFormProps<
    TFieldValues extends FieldValues
>
    extends UseRemixFormReturnType<TFieldValues> {
    children: React.ReactNode
    formSchema: TestArgsType
    method?: RemixFormProps["method"]
    className?: string
}

const BeringForm = <TFieldValues extends FieldValues>(
    {
        formSchema,
        children,
        className,
        method = "POST",
        ...props
    }: IBeringFormProps<TFieldValues>) => {
    let schema: z.AnyZodObject
    if (formSchema instanceof ZodEffects) {
        // True when .refine() used on schema.
        // @ts-ignore 
        schema = formSchema._def.schema
    } else {
        // True when schema does not include .refine()
        schema = formSchema as z.AnyZodObject
    }

    return (
        <BeringFormContext.Provider value={{ formSchema: schema }}>
            <RemixFormProvider {...props}>
                <RemixForm onSubmit={props.handleSubmit} method={method} className={className}>
                    {children}
                </RemixForm>
            </RemixFormProvider>
        </BeringFormContext.Provider>
    )
}

const isObjectMessage = (error: any): error is { type: string, message?: string } => {
    return typeof error === "object" && error !== null && "type" in error
}

const getDefaultMessage = (type: string): string => {
    switch (type) {
        case "required":
            return "字段不能为空"
        case "min":
            return "低于最小值"
        case "max":
            return "超过了最大值"
        case "pattern":
            return "字段格式不正确"
        case "minLength":
            return "字符串低于最小长度"
        case "maxLength":
            return "字符串超过了最大长度"
        case "invalid_type":
            return "字段类型不正确"
        default:
            return "字段格式不正确"
    }
}

const getErrorMessage = (error: FieldError) => {
    let message = error.message
    if (isObjectMessage(message)) {
        message = message.message
    }

    if (message)
        return message.length > 0 ? message : getDefaultMessage(error.type)
    else
        return getDefaultMessage(error.type)
}

export const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? getErrorMessage(error) : children

    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn("text-sm text-destructive", className)}
            {...props}
        >
            {body}
        </p>
    )
})

FormMessage.displayName = "FormMessage"

export default BeringForm
