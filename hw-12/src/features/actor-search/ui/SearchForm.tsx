import { useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

interface SearchFormInputs {
  query: string;
}

interface SearchFormProps {
  onSearch: (query: string) => void;
  onReset: () => void;
  currentQuery: string;
}

export function SearchForm({ onSearch, onReset, currentQuery }: SearchFormProps) {
  const { register, handleSubmit, reset } = useForm<SearchFormInputs>({
    defaultValues: { query: currentQuery },
  });

  const onSubmit = (data: SearchFormInputs) => {
    onSearch(data.query.trim());
  };

  const handleResetClick = () => {
    reset({ query: '' });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg mx-auto gap-2 mb-8">
      <Input
        {...register('query', { required: true })}
        type="text"
        placeholder="Введіть ім'я актора..."
      />
      <Button type="submit">Пошук</Button>
      {currentQuery && (
        <Button type="button" variant="secondary" onClick={handleResetClick}>
          Скинути
        </Button>
      )}
    </form>
  );
}