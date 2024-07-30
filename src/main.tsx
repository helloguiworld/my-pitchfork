// import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"

import { AuthProvider } from './contexts/AuthContext.tsx'

import MaintenancePage from './pages/MaintenancePage/index.tsx'

import HomePage from './pages/HomePage/index.tsx'
import SearchPage from './pages/SearchPage/index.tsx'
import ReviewPage from './pages/ReviewPage/index.tsx'

import AccessPage from './pages/AccessPage/index.tsx'
import TutorialsPage from './pages/TutorialsPage/index.tsx'
import MyPage from './pages/MyPage/index.tsx'

import './fonts.css'
import './global.css'
import "react-activity/dist/Squares.css"

const router = createBrowserRouter(
  import.meta.env.VITE_MAINTENANCE ?
    [
      {
        path: "/",
        element: <MaintenancePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ]
    :
    [
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
        path: "/login",
        element: <AccessPage mode='login' />,
      },
      {
        path: "/register",
        element: <AccessPage mode='register' />,
      },
      // {
      //   path: "/forgot-password",
      //   element: <AccessPage mode='forgot-password' />,
      // },
      // {
      //   path: "/password-reset",
      //   element: <AccessPage mode='password-reset' />,
      // },

      {
        path: "/tutorials/account",
        element: <TutorialsPage />,
      },

      {
        path: "/my",
        element: <MyPage />,
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
)
