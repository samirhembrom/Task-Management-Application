import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import Dashboard, { loader as tasksLoader, action as tasksAction } from './Dashboard';
import Task, {loader as taskLoader} from './Task';
import EditTask, {action as editTaskAction } from './EditTask';
import {action as destroyAction} from './Destroy';
import Index from './Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    errorElement: <ErrorPage />,
    loader: tasksLoader,
    action: tasksAction,
    children: [
      {
        index: true, element: <Index/>
      },
      {
        path:"tasks/:id",
        element: <Task />,
        loader: taskLoader,
      },
      {
        path: "tasks/:id/edit",
        element: <EditTask />,
        loader: taskLoader,
        action: editTaskAction,
      },
      {
        path: "tasks/:id/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}  />
  </StrictMode>,
)
