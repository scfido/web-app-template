import {
    Route,
    Routes,
} from "react-router-dom";
import  Normal  from './Normal';

const Component = () => (
    <Routes>
        <Route index element={<Normal />} />
        <Route path="normal" element={<Normal />} />
    </Routes>
);

export { Component};