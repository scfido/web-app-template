import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AppearanceProvider } from "@/components/themes/AppearanceContext"

import Home from '@/pages/home/Home'
import './index.css'
import { router as docsRouter } from "@/docs";
import { router as accountRouter } from "@/pages/accounts";
import { router as testRouter } from "@/pages/test";
import NotFound from '@/pages/NotFound';
import InformationLayout from '@/layouts/Information';

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
  {
    path: "*",
    element: <InformationLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />
      }
    ]

  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider defaultAppearance="light">
      <RouterProvider router={router} />
    </AppearanceProvider>
  </StrictMode>,
)
