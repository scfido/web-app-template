import { authenticator } from "./auth";
import { getSession } from "./session";

export interface IFetchApiOptions<T = any> extends RequestInit {
    /** 请求失败后返回的默认值 */
    default?: T;

    /** 匿名请求.为`true`时跳过内部设置Authorization header */
    anonymous?: boolean;

    headers?: HeadersInit;
}

export interface IFetchApi {
    get<T>(url: string, options?: IFetchApiOptions<T>): Promise<T>;
    post<T, D = any>(url: string, data?: D, options?: IFetchApiOptions<T>): Promise<T>;
    put<T, D = any>(url: string, data?: D, options?: IFetchApiOptions<T>): Promise<T>;
    delete<T>(url: string, options?: IFetchApiOptions<T>): Promise<T>;
    patch<T, D = any>(url: string, data?: D, options?: IFetchApiOptions<T>): Promise<T>;
}


export interface IAccessToken {
    token: string;
    expires: string;
    refreshToken?: string;
}


export class ResponseError extends Error {
    code?: string;
    details?: string;

    constructor(status?: number, details?: string) {
        super();
        this.code = status?.toString();
        this.message = getErrorMessage(status);
        this.details = details
    };
}

export class RequestError extends Error {
    constructor(message: string) {
        super(message);
    }
}

interface IAbpFormatError {
    error: {
        message: string;
        code: string;
        details: string;
        data: any;
        validationErrors: []
    }
}

let AccessTokenKey = 'bering_access_token';

let codeMessage: Record<number, string> = {
    200: "服务器成功返回请求的数据。",
    201: "新建或修改数据成功。",
    202: "一个请求已经进入后台排队（异步任务）。",
    204: "删除数据成功。",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有登录（令牌、用户名、密码错误等）。",
    403: "用户访问被禁止。",
    404: "没有找到访问的资源。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请稍后再试。",
    502: "网关错误。",
    503: "服务不可用，请稍后再试。",
    504: "网关超时。",
};

const getErrorMessage = (status?: number): string => {
    if (!status)
        return "未知错误";

    if (codeMessage.hasOwnProperty(status))
        return codeMessage[status];
    else
        return `未知错误:[${status}]`;
}

const getAbpError = async (response: Response) => {
    if (response.headers.get("_abperrorformat") === "true") {
        // 处理ABP框架已经格式化好的错误。

        const abpError = await response.json() as IAbpFormatError;
        return {
            code: abpError.error.code ?? response.status.toString(),
            message: abpError.error.message,
            details: abpError.error.details,
        }
    }

    return undefined;
}

const appendAuthorizationHeader = async (request: RequestInit): Promise<void> => {
    const session = await getSession();
    const token = session.get(authenticator.sessionKey);
    if (token) {
        request.headers = { ...request.headers, "Authorization": `Bearer ${token}` };
    }
}

async function fetchCore(path: string, method: string, data?: unknown, options?: IFetchApiOptions) {
    const url = process.env.API_SERVER + (path.startsWith('/') ? path : `/${path}`);
    const headers = options?.headers ?? {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const request: RequestInit = {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    };

    if (options?.anonymous !== true) {
        appendAuthorizationHeader(request);
    }

    try {
        const response = await fetch(url, request);
        if (!response.ok) {
            throw new ResponseError(response.status, await response.text());
        }
        return await response.json();
    } catch (error) {
        if (error instanceof ResponseError) {
            throw error;
        } else {
            throw new RequestError("Fetch请求错误:" + error?.toString());
        }
    }
}


const fetchApi: IFetchApi = {

    get: async <T>(url: string, options?: IFetchApiOptions<T>) => {
        return await fetchCore(url, "GET", undefined, options)
    },

    post: async <T, D = any>(url: string, data?: D, options?: IFetchApiOptions<T>) => {
        return await fetchCore(url, "POST", data, options)
    },

    put: async <T, D = any>(url: string, data?: D, options?: IFetchApiOptions<T>) => {
        return await fetchCore(url, "PUT", data, options)
    },

    delete: async <T>(url: string, options?: IFetchApiOptions<T>) => {
        return await fetchCore(url, "DELETE", undefined, options)
    },

    patch: async <T, D = any>(url: string, data?: D, options?: IFetchApiOptions<T>) => {
        return await fetchCore(url, "PATCH", data, options)
    },

}

export default fetchApi;

