import {
    Route,
    Routes,
} from "react-router-dom";
import Normal from './Normal';
import DynamicValidation from './DynamicValidation';
import Avatar from "./Avatar"

const Component = () => (
    <Routes>
        <Route index element={<Normal />} />
        <Route path="normal" element={<Normal />} />
        <Route path="dynamic-validation" element={<DynamicValidation />} />
        <Route path="avatar" element={<Avatar />} />
    </Routes>
);

export { Component };