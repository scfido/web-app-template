import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AppearanceProvider } from "@/components/themes/AppearanceContext"

import Home from '@/pages/home/Home'
import './index.css'
import {router as docsRouter} from "@/docs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/docs/*",
    children: docsRouter
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider defaultAppearance="light">
      <RouterProvider router={router} />
    </AppearanceProvider>
  </StrictMode>,
)
