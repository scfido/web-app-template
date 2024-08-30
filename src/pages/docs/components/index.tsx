import {
    Route,
    Routes,
} from "react-router-dom";
import  Button  from './Button.mdx';
import  Test  from './Test';

const Component = () => (
    <Routes>
        <Route index element={<Button />} />
        <Route path="button" element={<Button />} />
        <Route path="test" element={<Test/>} />
    </Routes>
);

export { Component};