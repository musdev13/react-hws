import { memo } from "react";

interface TitleGameProps {
  title: string;
}

export const TitleGame = memo(function TitleGame({ title }: TitleGameProps) {
  return <h1 className="title">{title}</h1>;
});