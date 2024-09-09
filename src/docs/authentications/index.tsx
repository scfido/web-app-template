import {
    Route,
    Routes,
} from "react-router-dom";
import Layout from "./layout";
import { LoginForm } from "./signin";

export const Component = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<h1>认证页面</h1>} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<h1>注册</h1>} />
        </Route>
    </Routes>
);