import IndexLayout from "@/layouts/IndexLayout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Home = lazy(() => import("@/pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexLayout />,
    children : [
      { path: "/", element: <Home /> },
    ]
  },
]);

export default router;