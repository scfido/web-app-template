import {
    Route,
    Routes,
} from "react-router-dom";
import Layout from "./Layout";
import Signin from "./Signin";
import Signup from "./Signup";

export const Component = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<h1>认证页面</h1>} />
            <Route path="login" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
        </Route>
    </Routes>
);