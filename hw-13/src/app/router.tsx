import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/layouts/main-layout";
import { Home } from "@/pages/home";
import { ActorDetails } from "@/pages/actor-details";
import { Favorites } from "@/pages/favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      },
    ],
  },
]);