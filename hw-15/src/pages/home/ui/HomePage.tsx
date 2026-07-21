import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ActorCard, getPopularActors, searchActors } from "@/entities/actor";
import { SearchForm } from "@/features/search-actors";
import { Pagination } from "@/shared/ui";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["actors", query, page],
    queryFn: () => (query ? searchActors(query, page) : getPopularActors(page)),
  });

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Знайдіть своїх улюблених акторів
        </h1>
        <p className="text-lg text-gray-500">
          Шукайте інформацію про тисячі кінодіячів, переглядайте їхні біографії та фільмографію.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <SearchForm initialQuery={query} onSearch={handleSearch} />
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 py-12">
          Сталася помилка при завантаженні даних. Спробуйте пізніше.
        </div>
      )}

      {!isLoading && !isError && data && (
        <>
          {data.results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">За вашим запитом нічого не знайдено.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.results.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </div>
          )}

          {data.total_pages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.min(data.total_pages, 500)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}