import { Authenticator } from "remix-auth";
import { getSession, sessionStorage } from "~/.server/session";
import { FormStrategy } from "remix-auth-form";
import { siginFormSchema, SiginFormSchemaType } from "~/routes/_public+/sign-in";
import { getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationError } from "@/lib/zod-cn";
import fetchApi from "~/.server/fetchApi";

export interface IUserAccessToken {
    access_Token: string;
    expires_in: number;
    refresh_Token: string | null;
    token_type: string;
    scope: string | null;
}

interface IUserAccessTokenInput {
    username: string;
    password: string;
    rememberMe?: boolean;
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<IUserAccessToken>(sessionStorage);

const login = async (username: string, password: string, rememberMe: boolean, receivedValues: Record<any, any>, session?: Session<SessionData, SessionData>): Promise<IUserAccessToken> => {
    // 模拟登录延迟
    // await new Promise(resolve => setTimeout(resolve, 1000))

    try {
        const res = await fetchApi.post<IUserAccessToken, IUserAccessTokenInput>("/api/auth/usertoken", {
            username,
            password,
            rememberMe
        },
            { anonymous: true, session }
        )

        return res;
    } catch (error) {
        throw new ValidationError(
            {
                password: { message: "邮箱或密码错误", type: "required" },
            },
            receivedValues,
        );
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

        const session = await getSession(request.headers.get("Cookie"));
        let user = await login(data.username, data.password, data.rememberMe ?? false, receivedValues, session);

        // 此用户的类型必须与传递给 Authenticator 的类型匹配
        // 如果直接在 `use` 方法中实例化，策略将自动继承该类型
        return user;
    }),
    // each strategy has a name and can be changed to use another one
    // same strategy multiple times, especially useful for the OAuth2 strategy.
    "user-pass"
);
