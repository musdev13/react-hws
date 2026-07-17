import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/layouts/main-layout";
import { AuthLayout } from "@/layouts/auth-layout";
import { Home } from "@/pages/home";
import { ActorDetails } from "@/pages/actor-details";
import { Favorites } from "@/pages/favorites";
import { LoginForm, loginAction } from "@/pages/login-form";
import { ErrorPage } from "@/pages/error-page";
import { requireAuthLoader, logoutAction } from "@/shared/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "actor/:actorId",
        element: <ActorDetails />,
      },
      {
        path: "favorites",
        element: <Favorites />,
        loader: requireAuthLoader,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
        action: loginAction,
      },
    ],
  },
  {
    path: "logout",
    action: logoutAction,
  },
]);