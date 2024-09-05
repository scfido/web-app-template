import {
    Route,
    Routes,
} from "react-router-dom";

export const Component = () => (
    <Routes>
        <Route index element={<h1>认证页面</h1>} />
        <Route path="login" element={<h1>登录</h1>} />
        <Route path="signup" element={<h1>注册</h1>} />
    </Routes>
);