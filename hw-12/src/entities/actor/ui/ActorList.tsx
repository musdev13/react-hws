import { type ReactNode } from 'react';

interface ActorListProps {
  children: ReactNode;
  isEmpty: boolean;
}

export function ActorList({ children, isEmpty }: ActorListProps) {
  if (isEmpty) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg font-medium">
        Акторів не знайдено 🔎
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {children}
    </div>
  );
}