import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { actorApi, ActorCard, ActorList } from '@/entities/actor';
import { SearchForm } from '@/features/actor-search';
import { ActorDetailsModal } from '@/features/actor-details';
import { Pagination } from '@/shared/ui/pagination';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedActorId, setSelectedActorId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['actors', { query, page }],
    queryFn: () => (query ? actorApi.search(query, page) : actorApi.getPopular(page)),
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleReset = () => {
    setQuery('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            🕵️‍♂️ Дослідник акторів (Actor Finder)
          </h1>
          <p className="text-gray-600">Знайдіть біографію та фільмографію улюблених акторів</p>
        </header>

        <main>
          <SearchForm currentQuery={query} onSearch={handleSearch} onReset={handleReset} />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : isError ? (
            <div className="text-center text-red-500 text-lg py-12">
              Сталася помилка при завантаженні даних. Спробуйте пізніше.
            </div>
          ) : (
            <>
              <ActorList isEmpty={!data || data.results.length === 0}>
                {data?.results.map((actor) => (
                  <ActorCard
                    key={actor.id}
                    actor={actor}
                    onClick={() => setSelectedActorId(actor.id)}
                  />
                ))}
              </ActorList>

              {data && data.total_pages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={Math.min(data.total_pages, 500)}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </main>

        <ActorDetailsModal
          actorId={selectedActorId}
          onClose={() => setSelectedActorId(null)}
        />
      </div>
    </div>
  );
}