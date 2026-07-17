import { Link } from "react-router";
import { Star } from "lucide-react";
import type { Actor } from "@/shared/tmdb";

interface ActorCardProps {
  actor: Actor;
}

export function ActorCard({ actor }: ActorCardProps) {
  return (
    <Link
      to={`/actor/${actor.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition duration-300"
    >
      <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            className="h-full w-full object-cover transform group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 font-medium">
            Немає фото
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white px-2 py-1 rounded-lg text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          {actor.popularity.toFixed(1)}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition truncate">
            {actor.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 truncate">{actor.known_for_department}</p>
        </div>
      </div>
    </Link>
  );
}