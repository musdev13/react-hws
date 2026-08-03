import { http, HttpResponse, delay } from 'msw';
import {
  users,
  requests,
  comments,
  statusHistory,
  categories,
  priorities,
  statuses,
  
} from './db';
import type {
    User,
    ServiceRequest
} from '@/shared/types';

const API_URL = 'http://localhost:3000';

const getAuthenticatedUser = (request: Request): User | null => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '');

  if (token === 'token-user-1') return users[0];
  if (token === 'token-operator-2') return users[1];
  return null;
};

const checkForForcedErrors = (request: Request) => {
  const forceError = request.headers.get('x-force-error');
  if (forceError === '500') {
    return HttpResponse.json({ message: 'Внутрішня помилка сервера' }, { status: 500 });
  }
  if (forceError === 'network') {
    return HttpResponse.error();
  }
  return null;
};

export const handlers = [
  // POST /auth/login
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const { email, password } = (await request.json()) as any;

    if (email === 'user@example.com' && password === 'user123') {
      return HttpResponse.json({
        accessToken: 'token-user-1',
        role: 'user',
      });
    }

    if (email === 'operator@example.com' && password === 'operator123') {
      return HttpResponse.json({
        accessToken: 'token-operator-2',
        role: 'operator',
      });
    }

    return HttpResponse.json(
      { message: 'Невірний email або пароль' },
      { status: 400 }
    );
  }),

  // GET /auth/me
  http.get(`${API_URL}/auth/me`, ({ request }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    return HttpResponse.json(user);
  }),

  // GET /requests/my
  http.get(`${API_URL}/requests/my`, async ({ request }) => {
    await delay(800);

    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'user') {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const myRequests = requests.filter((r) => r.clientEmail === user.email);
    return HttpResponse.json(myRequests);
  }),

  // GET /requests
  http.get(`${API_URL}/requests`, async ({ request }) => {
    await delay(800);

    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'operator') {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const url = new URL(request.url);
    const statusFilter = url.searchParams.get('status');

    let filteredRequests = requests;
    if (statusFilter && statusFilter !== 'all') {
      filteredRequests = requests.filter((r) => r.statusId === statusFilter);
    }

    return HttpResponse.json(filteredRequests);
  }),

  // GET /requests/:id
  http.get(`${API_URL}/requests/:id`, ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const reqId = params.id as string;
    const item = requests.find((r) => r.id === reqId);
    if (!item) return HttpResponse.json({ message: 'Заявку не знайдено' }, { status: 404 });

    if (user.role === 'user' && item.clientEmail !== user.email) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const reqComments = comments.filter((c) => c.requestId === reqId);

    return HttpResponse.json({
      ...item,
      comments: reqComments,
    });
  }),

  // POST /requests
  http.post(`${API_URL}/requests`, async ({ request }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'user') {
      return HttpResponse.json({ message: 'Only clients can create requests' }, { status: 403 });
    }

    const body = (await request.json()) as any;

    const newRequest: ServiceRequest = {
      id: `req-${Math.random().toString(36).substr(2, 9)}`,
      title: body.title,
      description: body.description,
      categoryId: body.categoryId,
      priorityId: body.priorityId,
      statusId: 'new',
      createdAt: new Date().toISOString(),
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: body.clientPhone || '+380000000000',
    };

    requests.unshift(newRequest);

    statusHistory.push({
      id: `h-${Math.random().toString(36).substr(2, 9)}`,
      requestId: newRequest.id,
      oldStatusId: null,
      newStatusId: 'new',
      updatedBy: user.name,
      updatedAt: newRequest.createdAt,
    });

    return HttpResponse.json(newRequest, { status: 201 });
  }),

  // PATCH /requests/:id/status
  http.patch(`${API_URL}/requests/:id/status`, async ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'operator') {
      return HttpResponse.json({ message: 'Only operators can change statuses' }, { status: 403 });
    }

    const reqId = params.id as string;
    const item = requests.find((r) => r.id === reqId);
    if (!item) return HttpResponse.json({ message: 'Заявку не знайдено' }, { status: 404 });

    const { statusId } = (await request.json()) as any;

    statusHistory.push({
      id: `h-${Math.random().toString(36).substr(2, 9)}`,
      requestId: reqId,
      oldStatusId: item.statusId,
      newStatusId: statusId,
      updatedBy: user.name,
      updatedAt: new Date().toISOString(),
    });

    item.statusId = statusId;

    return HttpResponse.json(item);
  }),

  // POST /requests/:id/comments
  http.post(`${API_URL}/requests/:id/comments`, async ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'operator') {
      return HttpResponse.json({ message: 'Only operators can comment' }, { status: 403 });
    }

    const reqId = params.id as string;
    const { text } = (await request.json()) as any;

    const newComment = {
      id: `com-${Math.random().toString(36).substr(2, 9)}`,
      requestId: reqId,
      authorName: user.name,
      text,
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);

    return HttpResponse.json(newComment, { status: 201 });
  }),

  // GET /requests/:id/history
  http.get(`${API_URL}/requests/:id/history`, ({ request, params }) => {
    const errorResponse = checkForForcedErrors(request);
    if (errorResponse) return errorResponse;

    const user = getAuthenticatedUser(request);
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const reqId = params.id as string;
    const reqHistory = statusHistory.filter((h) => h.requestId === reqId);

    return HttpResponse.json(reqHistory);
  }),

  // GET /categories
  http.get(`${API_URL}/categories`, () => HttpResponse.json(categories)),

  // GET /priorities
  http.get(`${API_URL}/priorities`, () => HttpResponse.json(priorities)),

  // GET /request-statuses
  http.get(`${API_URL}/request-statuses`, () => HttpResponse.json(statuses)),
];