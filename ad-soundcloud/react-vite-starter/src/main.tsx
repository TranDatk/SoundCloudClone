import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import UsersPage from './screens/users.page.tsx';
import Header from './components/header.tsx';
import Footer from './components/footer.tsx';
import { login } from './api/user.api.ts';
import TrackPage from './screens/tracks.page.tsx';

const LayoutAdmin = () => {
  useEffect(() => {
    login("admin", "12345678")
  }, [])
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tracks",
        element: <TrackPage />,
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
