import { Link } from "react-router-dom";
import { type NewsItem } from "../mocks/db";

interface NewsCardProps {
  news: Omit<NewsItem, "content">;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const formattedDate = new Date(news.createdAt).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all">
      <img
        src={news.imageUrl}
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
            {news.category}
          </span>
          <span className="text-xs text-zinc-400">{formattedDate}</span>
        </div>
        <h2 className="text-lg font-bold text-zinc-900 mb-2 line-clamp-2">
          {news.title}
        </h2>
        <p className="text-sm text-zinc-600 mb-4 line-clamp-3 flex-1">
          {news.summary}
        </p>
        <Link
          to={`/news/${news.id}`}
          className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 mt-auto"
        >
          Читати далі &rarr;
        </Link>
      </div>
    </article>
  );
};