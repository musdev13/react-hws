import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { NewsListPage } from "./pages/NewsListPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 pb-12">
      <Header />
      <main className="max-w-6xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <NewsListPage />,
      },
      {
        path: "news/:id",
        element: <NewsDetailPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}