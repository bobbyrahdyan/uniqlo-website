import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import MainHome from "../components/MainHome";
import MainCards from "../components/MainCards";
import MainDetail from "../components/MainDetail";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        children: [
            {
                path: "home",
                element: <MainHome />
            },
            {
                path: "products",
                element: <MainCards />
            },
            {
                path: "/detail/:slug",
                element: <MainDetail />
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
])

export default router;
