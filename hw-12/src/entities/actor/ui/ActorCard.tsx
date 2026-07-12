import { type Actor } from '../model/types';

interface ActorCardProps {
  actor: Actor;
  onClick: () => void;
}

export function ActorCard({ actor, onClick }: ActorCardProps) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w185';
  const fallbackImage = 'https://placehold.co/185x250?text=No+Photo';

  return (
    <div 
      onClick={onClick}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:border-purple-300 transition cursor-pointer flex flex-col items-center text-center bg-white"
    >
      <img
        src={actor.profile_path ? `${imageBaseUrl}${actor.profile_path}` : fallbackImage}
        alt={actor.name}
        className="rounded-md w-full h-62.5 object-cover mb-4"
        loading="lazy"
      />
      <h2 className="text-lg font-bold line-clamp-1 text-gray-800">{actor.name}</h2>
      <p className="text-sm text-gray-500 mt-1">Популярність: {actor.popularity.toFixed(1)}</p>
    </div>
  );
}