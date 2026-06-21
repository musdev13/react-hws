interface TitleGameProps {
  title: string;
  age?: number;
}

export function TitleGame({ title, age }: TitleGameProps) {
  return (
    <h1 className="title">
      {title} {age}
    </h1>
  );
}
