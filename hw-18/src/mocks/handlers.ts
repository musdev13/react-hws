import { http, HttpResponse, delay } from "msw";
import { mockNews } from "./db";

export const handlers = [
  http.get("/api/news", async () => {
    await delay(600);
    const newsList = mockNews.map(({ content, ...rest }) => rest);
    return HttpResponse.json(newsList);
  }),

  http.get("/api/news/:id", async ({ params }) => {
    await delay(600);
    const { id } = params;
    const newsItem = mockNews.find((item) => item.id === id);

    if (!newsItem) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(newsItem);
  }),
];