import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ProductsTable from "../components/ProductsTable";
import CategoriesTable from "../components/CategoriesTable";
import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "login",
        element: <LoginPage />,
        loader: () => {
            const token = localStorage.getItem("access_token");

            if (token) {
                return redirect('/');
            }

            return token
        }
    },
    {
        path: "/",
        element: <MainPage />,
        children: [
            {
                path: "",
                element: <ProductsTable />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "products",
                element: <ProductsTable />
            },
            {
                path: "categories",
                element: <CategoriesTable />
            },
            {
                path: "*",
                element: <h1>404 Not Found</h1>
            },
        ],
        loader: () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                return redirect('/login');
            }

            return token;
        }
    }
])

export default router;
