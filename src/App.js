import React from 'react'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from './main'

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
