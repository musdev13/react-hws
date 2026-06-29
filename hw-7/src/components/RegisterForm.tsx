import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordComfirm: '',
    },
  });

  const username = watch('username');
  const email = watch('email');
  const password = watch('password');
  const passwordComfirm = watch('passwordComfirm');

  const getFieldClass = (value: string, error?: { message?: string }) => {
    if (error) return 'error';
    if (value && value.length > 0 && !error) return 'success';
    return '';
  };

  const onSubmit = (data: RegisterFormData) => {
    console.log('Дані форми:', data);
    alert(`Реєстрація успішна!\n\n${JSON.stringify(data, null, 2)}`);
    reset();
  };

  return (
    <div className="container">
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration</h1>

        {/* Поле Username */}
        <div className={`input-control ${getFieldClass(username, errors.username)}`}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username')}
          />
          <div className="error">{errors.username?.message}</div>
        </div>

        {/* Поле Email */}
        <div className={`input-control ${getFieldClass(email, errors.email)}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            {...register('email')}
          />
          <div className="error">{errors.email?.message}</div>
        </div>

        {/* Поле Password */}
        <div className={`input-control ${getFieldClass(password, errors.password)}`}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
          />
          <div className="error">{errors.password?.message}</div>
        </div>

        {/* Поле Password Confirm */}
        <div className={`input-control ${getFieldClass(passwordComfirm, errors.passwordComfirm)}`}>
          <label htmlFor="passwordComfirm">Password again</label>
          <input
            id="passwordComfirm"
            type="password"
            {...register('passwordComfirm')}
          />
          <div className="error">{errors.passwordComfirm?.message}</div>
        </div>

        {/* Кнопка Submit */}
        <button
          type="submit"
          disabled={!isValid || !isDirty || isSubmitting}
        >
          {isSubmitting ? 'Завантаження...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;