import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import SearchPage from './pages/SearchPage/index.tsx'
import ReviewPage from './pages/ReviewPage/index.tsx'

import './fonts.css'
import './global.css'
import "react-activity/dist/Squares.css"

const router = createBrowserRouter([
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/review/:id",
    element: <ReviewPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
