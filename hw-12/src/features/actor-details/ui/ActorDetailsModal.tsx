import { useQuery } from '@tanstack/react-query';
import { actorApi } from '@/entities/actor';
import { Modal } from '@/shared/ui/modal';

interface ActorDetailsModalProps {
  actorId: number | null;
  onClose: () => void;
}

export function ActorDetailsModal({ actorId, onClose }: ActorDetailsModalProps) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w185';
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w92';
  const fallbackImage = 'https://placehold.co/185x250?text=No+Photo';
  const fallbackPoster = 'https://placehold.co/92x138?text=No+Poster';

  // 1. Отримання деталей актора
  const { data: details, isLoading: isDetailsLoading, isError: isDetailsError } = useQuery({
    queryKey: ['actor', 'details', actorId],
    queryFn: () => actorApi.getDetails(actorId!),
    enabled: !!actorId,
    staleTime: 10 * 60 * 1000, // 10 хвилин за ТЗ
  });

  // 2. Отримання фільмографії актора
  const { data: credits, isLoading: isCreditsLoading } = useQuery({
    queryKey: ['actor', 'credits', actorId],
    queryFn: () => actorApi.getMovieCredits(actorId!),
    enabled: !!actorId,
    staleTime: 10 * 60 * 1000,
  });

  const calculateAge = (birthday: string | null) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = details ? calculateAge(details.birthday) : null;
  const displayedMovies = credits?.cast.slice(0, 6) || [];

  return (
    <Modal isOpen={!!actorId} onClose={onClose}>
      {isDetailsLoading || isCreditsLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : isDetailsError || !details ? (
        <div className="text-center text-red-500 py-8">Помилка завантаження даних актора.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src={details.profile_path ? `${imageBaseUrl}${details.profile_path}` : fallbackImage}
              alt={details.name}
              className="rounded-lg w-full h-auto shadow-md object-cover"
            />

            <div className="md:col-span-2 space-y-4">
              <h2 className="text-3xl font-extrabold text-gray-900">{details.name}</h2>
              
              <div className="flex flex-col gap-1 text-sm text-gray-700">
                <span>
                  🎂 Дата народження: {details.birthday || 'Невідомо'} 
                  {age !== null && ` (Вік: ${age} років)`}
                </span>
                <span>📍 Місце народження: {details.place_of_birth || 'Невідомо'}</span>
              </div>

              <div>
                <h3 className="text-md font-bold text-gray-800">Біографія</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed max-h-48 overflow-y-auto pr-2">
                  {details.biography || 'Біографія відсутня.'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Відомі роботи (Фільмографія)</h3>
            {displayedMovies.length === 0 ? (
              <p className="text-sm text-gray-500">Інформація про роботи відсутня.</p>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {displayedMovies.map((movie) => (
                  <div key={movie.id} className="text-center flex flex-col items-center">
                    <img
                      src={movie.poster_path ? `${posterBaseUrl}${movie.poster_path}` : fallbackPoster}
                      alt={movie.title}
                      className="w-full h-30 object-cover rounded-md shadow-sm"
                    />
                    <p className="font-bold text-xs mt-1.5 line-clamp-1 text-gray-800 w-full">
                      {movie.title}
                    </p>
                    <p className="text-[10px] text-gray-500 line-clamp-1 w-full">
                      {movie.character || 'Самосебе'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}