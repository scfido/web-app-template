import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="h-full flex flex-col">
            <header className="h-24 text-center">
                <h1>WebUI</h1>
            </header>
            <main className="flex-1 flex justify-center items-center">
                <Outlet />
            </main>
            <footer className="h-16 text-center text-gray-500">
                <p>© {new Date().getFullYear()} WebUI</p>
            </footer>
        </div>
    );
};

export default Layout;