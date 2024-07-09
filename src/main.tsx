import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"

import HomePage from './pages/HomePage/index.tsx'
import SearchPage from './pages/SearchPage/index.tsx'
import ReviewPage from './pages/ReviewPage/index.tsx'

import './fonts.css'
import './global.css'
import "react-activity/dist/Squares.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search/*",
    element: <SearchPage />,
  },
  {
    path: "/review/:id",
    element: <ReviewPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
