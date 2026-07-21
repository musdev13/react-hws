import type { LoaderFunctionArgs } from "react-router";

export function actorDetailsLoader({ params }: LoaderFunctionArgs) {
  const actorId = Number(params.actorId);
  if (isNaN(actorId)) {
    throw new Response("Bad Request", { status: 400, statusText: "Invalid Actor ID" });
  }
  return { actorId };
}