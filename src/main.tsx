import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AppearanceProvider } from "@/components/themes/AppearanceContext"

import App from './App.tsx'
import './index.css'
import {router as docsRouter} from "../docs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/docs/*",
    children: docsRouter
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider defaultAppearance="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </AppearanceProvider>
  </StrictMode>,
)
