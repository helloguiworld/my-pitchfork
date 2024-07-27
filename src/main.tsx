import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"

import { AuthProvider } from './contexts/AuthContext.tsx'

import HomePage from './pages/HomePage/index.tsx'
import SearchPage from './pages/SearchPage/index.tsx'
import ReviewPage from './pages/ReviewPage/index.tsx'
import LoginPage from './pages/AccessPage/index.tsx'

import './fonts.css'
import './global.css'
import "react-activity/dist/Squares.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage mode='login' />,
  },
  {
    path: "/register",
    element: <LoginPage mode='register' />,
  },
  {
    path: "/forgot-password",
    element: <LoginPage mode='forgot-password' />,
  },
  {
    path: "/password-reset",
    element: <LoginPage mode='password-reset' />,
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
  // <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  // </React.StrictMode>
)
