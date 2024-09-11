import React from "react";
import { Form as ShadcnForm } from "@/components/ui/form"
import { FieldValues, FormProviderProps } from "react-hook-form";
import { z, ZodEffects } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TestArgsType = Parameters<typeof zodResolver>[0];

interface IZodFormContextValue {
    formSchema: z.AnyZodObject
}

const ZodFormContext = React.createContext<IZodFormContextValue>({} as IZodFormContextValue)

export function useZodFormContext() {
    return React.useContext(ZodFormContext)
}

export interface IZodFormProps<
    TFieldValues extends FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined
>
    extends FormProviderProps<TFieldValues, TContext, TTransformedValues> {
    formSchema: TestArgsType
}

const ZodForm = <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(
    { formSchema, ...props }: IZodFormProps<TFieldValues, TContext, TTransformedValues>) => {
    let schema: z.AnyZodObject
    if (formSchema instanceof ZodEffects) {
        // True when .refine() used on schema.
        // @ts-ignore 
        schema = formSchema._def.schema
    } else {
        // True when schema does not include .refine()
        schema = formSchema as z.AnyZodObject
    }
    return <ZodFormContext.Provider value={{ formSchema: schema }}>
        <ShadcnForm {...props} />
    </ZodFormContext.Provider>
}

export default ZodForm
