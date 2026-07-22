import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white border-b border-zinc-200 shadow-xs mb-8">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          NewsPortal
        </Link>
        <nav>
          <Link
            to="/"
            className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors"
          >
            Головна
          </Link>
        </nav>
      </div>
    </header>
  );
};