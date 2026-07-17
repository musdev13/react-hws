import { ActorCard } from "../actor-card";
import type { Actor } from "@/shared/tmdb";

interface ActorListProps {
  actors: Actor[];
}

export function ActorList({ actors }: ActorListProps) {
  if (actors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">За вашим запитом нічого не знайдено.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {actors.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
}