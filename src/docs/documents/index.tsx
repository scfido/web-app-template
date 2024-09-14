import {
    Route,
    Routes,
} from "react-router-dom";
import  Colors  from './Colors';

const Component = () => (
    <Routes>
        <Route index element={<Colors />} />
        <Route path="colors" element={<Colors/>} />
    </Routes>
);

export { Component};