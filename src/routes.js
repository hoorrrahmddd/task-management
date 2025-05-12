import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "./App";
import { Login } from "./authintication/Login";
import { Home } from "./home/Home";
import { MyTasks } from "./pages/EmployeePages/MyTasks";
import { Register } from "./authintication/Register";
import EmployeeDashboard from "./pages/EmployeePages/EmployeeDashboard";
import AddTask from "./pages/ManagerPages/AddTask";
import ShowTasks from "./pages/ManagerPages/ShowTasks";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/dashboard",
                element: <EmployeeDashboard/>,
            },
            {
                path: "/my-tasks",
                element: <MyTasks/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/Add-Task",
                element: <AddTask/>,
            },
            {
                path: "/Show-Tasks",
                element: <ShowTasks/>,
            },
        ]
    },

    {
        path: "*",
        element: <Navigate to={"/"}/>
    },
])