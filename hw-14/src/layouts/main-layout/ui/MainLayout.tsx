import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, Form } from "react-router";

export function MainLayout() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-purple-600 hover:text-purple-700 transition">
            🎬 Actor Explorer
          </Link>
          <nav className="flex gap-6 font-medium items-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `transition duration-200 hover:text-purple-600 ${
                  isActive ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "text-gray-600"
                }`
              }
            >
              Головна
            </NavLink>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => 
                `transition duration-200 hover:text-purple-600 ${
                  isActive ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "text-gray-600"
                }`
              }
            >
              Обране
            </NavLink>
            {username ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <span className="text-sm font-semibold text-gray-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                  {username}
                </span>
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="text-sm font-bold text-red-600 hover:text-red-700 transition"
                  >
                    Вийти
                  </button>
                </Form>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition shadow-xs"
              >
                Увійти
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-6">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Actor Explorer. Всі права захищено.</p>
      </footer>
    </div>
  );
}