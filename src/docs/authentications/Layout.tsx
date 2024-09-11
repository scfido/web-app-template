import ThemeProvider from '@/components/themes/ThemeProvider';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
                <div >
                    <svg
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 800 800">
                        <g opacity={0.22}>
                            
                            <circle className="fill-primary/10" cx="400" cy="400" r="600"></circle>
                            <circle className="fill-primary/20" cx="400" cy="400" r="500"></circle>
                            <circle className="fill-primary/30" cx="400" cy="400" r="300"></circle>
                            <circle className="fill-primary/40" cx="400" cy="400" r="200"></circle>
                            <circle className="fill-primary/50" cx="400" cy="400" r="100"></circle>
                            {/* <circle style={{ fill: 'hsl(var(--primary) / 10%)' }} cx="400" cy="400" r="600"></circle>
                        <circle style={{ fill: 'hsl(var(--primary) / 20%)' }} cx="400" cy="400" r="500"></circle>
                        <circle style={{ fill: 'hsl(var(--primary) / 30%)' }} cx="400" cy="400" r="300"></circle>
                        <circle style={{ fill: 'hsl(var(--primary) / 40%)' }} cx="400" cy="400" r="200"></circle>
                        <circle style={{ fill: 'hsl(var(--primary) / 50%)' }} cx="400" cy="400" r="100"></circle> */}
                        </g>
                    </svg>
                </div>
                <div className="relative w-full h-full flex flex-col">
                    <main className="flex-1 flex justify-center items-center">
                        <Outlet />
                    </main>
                    <footer className="h-8 text-center text-xs text-gray-500 mt-4 sm:mt-16">
                        <p>© {new Date().getFullYear()} WebUI</p>
                    </footer>

                </div>
            </div>
        </ThemeProvider>

    );
};

export default Layout;