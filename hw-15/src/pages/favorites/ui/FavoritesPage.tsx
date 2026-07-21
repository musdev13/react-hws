import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, Trash2 } from "lucide-react";
import type { ActorDetails } from "@/entities/actor";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<ActorDetails[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites_actors");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const handleRemove = (id: number) => {
    const updated = favorites.filter((actor) => actor.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites_actors", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          Обрані актори
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Список акторів, яких ви зберегли для швидкого доступу.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Немає обраних</h3>
          <p className="mt-1 text-sm text-gray-500">Почніть додавати акторів на сторінці деталей.</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Перейти на головну
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((actor) => (
            <div
              key={actor.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link to={`/actor/${actor.id}`} className="flex-1">
                <div className="aspect-[3/4] bg-gray-200 group-hover:opacity-75 transition">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                      Немає фото
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{actor.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 truncate">{actor.known_for_department}</p>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleRemove(actor.id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}