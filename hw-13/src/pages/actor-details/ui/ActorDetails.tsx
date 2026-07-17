import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, ArrowLeft, Star } from "lucide-react";
import { getActorDetails, getActorMovieCredits } from "@/shared/tmdb";
import type { ActorDetails as ActorDetailsType } from "@/shared/tmdb";

export function ActorDetails() {
  const { actorId } = useParams<{ actorId: string }>();
  const id = Number(actorId);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: actor, isLoading: isActorLoading, isError: isActorError } = useQuery({
    queryKey: ["actor", id],
    queryFn: () => getActorDetails(id),
    enabled: !isNaN(id),
  });

  const { data: credits, isLoading: isCreditsLoading } = useQuery({
    queryKey: ["actor-credits", id],
    queryFn: () => getActorMovieCredits(id),
    enabled: !isNaN(id),
  });

  useEffect(() => {
    if (!isNaN(id)) {
      const stored = localStorage.getItem("favorites_actors");
      if (stored) {
        try {
          const list: ActorDetailsType[] = JSON.parse(stored);
          setIsFavorite(list.some((item) => item.id === id));
        } catch {
          setIsFavorite(false);
        }
      }
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!actor) return;
    const stored = localStorage.getItem("favorites_actors");
    let list: ActorDetailsType[] = [];
    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch {
        list = [];
      }
    }

    if (isFavorite) {
      list = list.filter((item) => item.id !== actor.id);
    } else {
      list.push(actor);
    }

    localStorage.setItem("favorites_actors", JSON.stringify(list));
    setIsFavorite(!isFavorite);
  };

  const isLoading = isActorLoading || isCreditsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (isActorError || !actor) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold">Помилка завантаження даних про актора.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-purple-600 hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" /> Назад
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="md:col-span-1">
          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 shadow-inner">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/h632${actor.profile_path}`}
                alt={actor.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                Немає фото
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{actor.name}</h1>
              <p className="text-purple-600 font-medium">{actor.known_for_department}</p>
            </div>
            <button
              onClick={toggleFavorite}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition ${
                isFavorite
                  ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-600" : ""}`} />
              {isFavorite ? "В обраному" : "Додати в обране"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <p className="text-gray-500">Дата народження</p>
              <p className="font-semibold text-gray-900">{actor.birthday || "Невідомо"}</p>
            </div>
            {actor.deathday && (
              <div>
                <p className="text-gray-500">Дата смерті</p>
                <p className="font-semibold text-gray-900">{actor.deathday}</p>
              </div>
            )}
            <div>
              <p className="text-gray-500">Місце народження</p>
              <p className="font-semibold text-gray-900">{actor.place_of_birth || "Невідомо"}</p>
            </div>
            <div>
              <p className="text-gray-500">Популярність</p>
              <p className="font-semibold text-gray-900 flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {actor.popularity.toFixed(1)}
              </p>
            </div>
          </div>

          {actor.biography && (
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">Біографія</h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {actor.biography}
              </p>
            </div>
          )}
        </div>
      </div>

      {credits && credits.cast.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Фільмографія</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {credits.cast.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="aspect-[2/3] bg-gray-100">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400 text-xs text-center p-2">
                      Немає постера
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{movie.title}</h4>
                  {movie.character && (
                    <p className="text-[10px] text-gray-500 truncate mt-1">Роль: {movie.character}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}