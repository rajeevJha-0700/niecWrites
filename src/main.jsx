import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login , Home,Add_Post,Signup,Edit_Post,Post,All_Post, Dashboard } from './component/Warehouse.js'
import GoToUser from './component/GoToUser.jsx'

import PageNotFound from './component/404.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {  
           index:true,
            path: "/",
            element:<Home/>
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <All_Post />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Add_Post />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Edit_Post />
                </AuthLayout>
            ),
        },
        {
            path: "/dashboard",
            element: (
             <AuthLayout authentication ={true}>
                <Dashboard/>
             </AuthLayout>
            )
        },
        {
            path: "/post/:slug",
            
            element: <Post />,
        },
        {
          path: "/users/:slug",
          element: (
            <AuthLayout authentication ={true}>
                <GoToUser/>
            </AuthLayout>
          )
        },
        {
          path: "*",
          element: (
                <PageNotFound/>
          )
        }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)