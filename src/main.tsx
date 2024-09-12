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
import {router as accountRouter} from "@/pages/accounts";
import {router as testRouter} from "@/pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/docs/*",
    children: docsRouter
  },
  {
    path: "/accounts/*",
    children: accountRouter
  },
  {
    path: "/test/*",
    children: testRouter
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider defaultAppearance="light">
      <RouterProvider router={router} />
    </AppearanceProvider>
  </StrictMode>,
)
