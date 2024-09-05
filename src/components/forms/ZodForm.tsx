import { z } from "@/lib/zod-cn";
import React from "react";
import { Form as ShadcnForm } from "@/components/ui/form"
import { FieldValues, FormProviderProps } from "react-hook-form";

interface IZodFormContextValue {
    formSchema: z.AnyZodObject
}

const ZodFormContext = React.createContext<IZodFormContextValue>({} as IZodFormContextValue)

export function useZodFormContext() {
    return React.useContext(ZodFormContext)
}

export interface IZodFormProps<TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined> extends FormProviderProps<TFieldValues, TContext, TTransformedValues> {
    formSchema: z.AnyZodObject
}

const ZodForm = <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(
    { formSchema, ...props }: IZodFormProps<TFieldValues, TContext, TTransformedValues>) => {
    return <ZodFormContext.Provider value={{ formSchema }}>
        <ShadcnForm {...props} />
    </ZodFormContext.Provider>
}

export default ZodForm
