import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Users } from './pages/users.jsx'
import { AddUser } from './pages/add-user.jsx'
import { UserDetails } from './pages/user-details.jsx'

const router = createBrowserRouter([
  {path: "", element: <Users />},
  {path: "add", element: <AddUser />},
  {path: "users/:id", element: <UserDetails />},

])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
