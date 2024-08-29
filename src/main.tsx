import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import ButtonSample from '@/pages/samples/button';
import './index.css'
import DocsLayout from './layouts/docs/DocLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/samples",
    element: <DocsLayout />,
    children: [
      {
        index: true,
        element: <ButtonSample />,
      },
      {
        path: "button",
        index: true,
        element: <ButtonSample />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
