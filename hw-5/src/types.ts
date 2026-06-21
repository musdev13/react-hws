export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'normal' | 'high';
  date: string | null;
}