import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootPage from './routes/Root-Page'
import ErrorPage from './routes/Error-Page'
import HomePage from './routes/Home-Page'
import ShopPage, { loader as shopLoader } from './routes/Shop-Page'
import ProductPage, { loader as productLoader } from './routes/Product-Page'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'shop/:category',
            element: <ShopPage />,
            loader: shopLoader,
          },
          {
            path: 'product/:productId',
            element: <ProductPage />,
            loader: productLoader,
          },
        ]
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
