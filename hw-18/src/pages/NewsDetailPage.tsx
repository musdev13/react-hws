import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { type NewsItem } from "../mocks/db";
import { Spinner } from "../components/Spinner";

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setIsNotFound(false);
    setError(null);

    fetch(`/api/news/${id}`)
      .then((res) => {
        if (res.status === 404) {
          setIsNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Помилка завантаження новини");
        return res.json();
      })
      .then((data) => {
        if (data) setNews(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  if (isNotFound) {
    return (
      <div className="text-center py-16 bg-white border border-zinc-200 rounded-3xl p-8 max-w-lg mx-auto">
        <h2 className="text-4xl font-bold text-zinc-900 mb-2">404</h2>
        <p className="text-zinc-600 mb-6">
          Запитуваної новини не існує або її було видалено.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all inline-block"
        >
           повернутися на головну
        </Link>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="text-center py-12 text-rose-600 font-semibold">
        {error || "Сталася помилка"}
      </div>
    );
  }

  const formattedDate = new Date(news.createdAt).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs p-6 sm:p-10">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
      >
        &larr; Назад до новин
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
        <span className="font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
          {news.category}
        </span>
        <span className="text-zinc-400">•</span>
        <span className="text-zinc-500">{formattedDate}</span>
        <span className="text-zinc-400">•</span>
        <span className="text-zinc-500 font-medium">Автор: {news.author}</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold text-zinc-900 mb-6">
        {news.title}
      </h1>

      <img
        src={news.imageUrl}
        alt={news.title}
        className="w-full h-80 object-cover rounded-2xl mb-8"
      />

      <div className="text-zinc-700 leading-relaxed space-y-4 text-base sm:text-lg">
        {news.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};