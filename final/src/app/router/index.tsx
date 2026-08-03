import { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from '@/pages/login/LoginPage';
import { RequestsListPage } from '@/pages/requests-list/RequestsListPage';
import { RequestCreatePage } from '@/pages/request-create/RequestCreatePage';
import { LazyRequestDetailPage } from '@/pages/request-detail/RequestDetailPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="text-gray-500">Завантаження...</div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/requests" replace />,
  },
  {
    path: '/login',
    element: (
      <PublicLayout>
        <LoginPage />
      </PublicLayout>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'requests',
        element: <RequestsListPage />,
      },
      {
        path: 'requests/new',
        element: (
          <ProtectedRoute requiredRole="user">
            <RequestCreatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'requests/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyRequestDetailPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
]);