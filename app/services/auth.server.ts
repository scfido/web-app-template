import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { siginFormSchema, SiginFormSchemaType } from "~/routes/_public+/sign-in";
import { getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationError } from "@/lib/zod-cn";

export interface IUser {
    accessToken: string;
    name: string;

    /**
     * 是否记住登录信息，服务端会根据此值设置 cookie 的过期时间。
     * 
     * 这个值无需保存到Cookie中。
     */
    remember?: boolean;
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<IUser>(sessionStorage);

const login = async (email: string, password: string, receivedValues: Record<any, any>): Promise<IUser> => {
    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (password !== "11111111") {
        throw new ValidationError(
            {
                password: { message: "邮箱或密码错误", type: "required" },
            },
            receivedValues,
        );
    }

    return {
        accessToken: "1",
        name: email,
    }
}

// Tell the Authenticator to use the form strategy
authenticator.use(
    new FormStrategy(async ({ form, request }) => {

        const {
            errors,
            data,
            receivedValues
        } = await getValidatedFormData<SiginFormSchemaType>(form, zodResolver(siginFormSchema));

        if (errors) {
            // 键 "errors" 和 "defaultValues" 会被 useRemixForm 自动使用
            throw new ValidationError(errors, receivedValues);
        }

        let user = await login(data.email, data.password, receivedValues);
        user.remember = data.remember;

        // 此用户的类型必须与传递给 Authenticator 的类型匹配
        // 如果直接在 `use` 方法中实例化，策略将自动继承该类型
        return user;
    }),
    // each strategy has a name and can be changed to use another one
    // same strategy multiple times, especially useful for the OAuth2 strategy.
    "user-pass"
);
