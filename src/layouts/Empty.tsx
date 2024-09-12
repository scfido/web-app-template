import ThemeProvider from '@/components/themes/ThemeProvider';
import { Outlet } from 'react-router-dom';

const EmptyLayout = () => {
    return (
        <ThemeProvider>
            <Outlet />
        </ThemeProvider>
    );
};

export default EmptyLayout;