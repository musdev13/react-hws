import { useEffect, useState } from "react";
import { type NewsItem } from "../mocks/db";
import { NewsCard } from "../components/NewsCard";
import { Spinner } from "../components/Spinner";

export const NewsListPage = () => {
  const [newsList, setNewsList] = useState<Omit<NewsItem, "content">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження новин");
        return res.json();
      })
      .then((data) => setNewsList(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="text-center py-12 text-rose-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 mb-6">Останні новини</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};