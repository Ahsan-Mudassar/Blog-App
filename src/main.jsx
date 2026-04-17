import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login } from './components/index.js'
import Post from './pages/Post'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Signup from './pages/Signup'
import AllPost from "./pages/AllPost";
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path: '/add-posts',
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: (
          <Post />
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
