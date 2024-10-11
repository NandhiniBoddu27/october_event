import { useState } from 'react'
import Auth from './pages/Auth'
import './App.css'
import Dashboard from './pages/Dashboard'
import CDPTransformations from './pages/CDPTransformations'
import UserFlow from './pages/UserFlow'
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"

function App() {

  const routes = [

    {
      path: "/",
      element: <Navigate to="/login"/> ,
    },
    {
      path: "/login",
      element: <Auth />
    },
    {
      path:"/dashboard",
      element: <Dashboard />,
    },
    {
      path:"/cdp-transformation", //doubt : any convention to be used ? 
      element: <CDPTransformations />,
    },
    {
      path:"/userflow",
      element: <UserFlow />,
    },
  ];
  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
