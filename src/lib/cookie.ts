/**
 * 解析 Cookie 字符串并返回一个包含所有 Cookie 键值对的对象
 * @param cookieHeader - Cookie 字符串
 * @returns 包含所有 Cookie 键值对的对象
 */
export function parseCookies(cookieHeader: string | undefined | null): Record<string, string> {
    if (!cookieHeader) return {}

    return cookieHeader
        .split(";")
        .map(cookie => cookie.trim().split("="))
        .reduce((acc, [key, value]) => {
            acc[key] = value !== undefined ? value : "";
            return acc;
        }, {} as Record<string, string>);
}

