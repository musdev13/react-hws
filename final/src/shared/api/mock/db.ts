import type { User, ServiceRequest, Comment, StatusHistoryEntry, Category, Priority, Status } from '@/shared/types';

// Початкові статичні списки
export const categories: Category[] = [
  { id: 'tech', name: 'Технічні проблеми' },
  { id: 'billing', name: 'Фінансові питання' },
  { id: 'feedback', name: 'Пропозиції та відгуки' },
];

export const priorities: Priority[] = [
  { id: 'low', name: 'Низький' },
  { id: 'medium', name: 'Середній' },
  { id: 'high', name: 'Високий' },
];

export const statuses: Status[] = [
  { id: 'new', name: 'Нова' },
  { id: 'in_progress', name: 'В роботі' },
  { id: 'resolved', name: 'Вирішена' },
  { id: 'cancelled', name: 'Скасована' },
];

// Ініціалізація даних
export let users: User[] = [
  { id: 'u-1', email: 'user@example.com', name: 'Іван Клієнт', role: 'user' },
  { id: 'u-2', email: 'operator@example.com', name: 'Олена Оператор', role: 'operator' },
];

export let requests: ServiceRequest[] = [
  {
    id: 'req-1',
    title: 'Не вмикається монітор',
    description: 'Після ввімкнення комп\'ютера екран залишається чорним, індикатор живлення блимає жовтим.',
    categoryId: 'tech',
    priorityId: 'high',
    statusId: 'new',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    clientName: 'Іван Клієнт',
    clientEmail: 'user@example.com',
    clientPhone: '+380501112233',
  },
  {
    id: 'req-2',
    title: 'Помилка при оплаті рахунку',
    description: 'Намагався оплатити послуги через онлайн-кабінет, але транзакція була відхилена банком.',
    categoryId: 'billing',
    priorityId: 'medium',
    statusId: 'in_progress',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    clientName: 'Іван Клієнт',
    clientEmail: 'user@example.com',
    clientPhone: '+380501112233',
  },
  {
    id: 'req-3',
    title: 'Запит на оновлення ПЗ',
    description: 'Просимо встановити останню версію офісного пакету на робочий ноутбук.',
    categoryId: 'tech',
    priorityId: 'low',
    statusId: 'resolved',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    clientName: 'Петро Замовник',
    clientEmail: 'petro@example.com',
    clientPhone: '+380679998877',
  },
  {
    id: 'req-4',
    title: 'Налаштування корпоративної пошти',
    description: 'Потрібно створити нову поштову скриньку для нового співробітника відділу продажів.',
    categoryId: 'tech',
    priorityId: 'medium',
    statusId: 'cancelled',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    clientName: 'Марія Клієнтка',
    clientEmail: 'maria@example.com',
    clientPhone: '+380635554433',
  },
  {
    id: 'req-5',
    title: 'Пропозиція щодо інтерфейсу кабінету',
    description: 'Було б чудово додати темну тему для сторінки створення сервісних заявок.',
    categoryId: 'feedback',
    priorityId: 'low',
    statusId: 'new',
    createdAt: new Date().toISOString(),
    clientName: 'Іван Клієнт',
    clientEmail: 'user@example.com',
    clientPhone: '+380501112233',
  },
];

export let comments: Comment[] = [
  {
    id: 'com-1',
    requestId: 'req-2',
    authorName: 'Олена Оператор',
    text: 'Ми зв\'язалися з техпідтримкою еквайрингу. Спробуйте повторити оплату після 15:00.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'com-2',
    requestId: 'req-3',
    authorName: 'Олена Оператор',
    text: 'Оновлення успішно встановлено, перевірте працездатність програм.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export let statusHistory: StatusHistoryEntry[] = [
  {
    id: 'h-1',
    requestId: 'req-2',
    oldStatusId: 'new',
    newStatusId: 'in_progress',
    updatedBy: 'Олена Оператор',
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
  {
    id: 'h-2',
    requestId: 'req-3',
    oldStatusId: 'new',
    newStatusId: 'resolved',
    updatedBy: 'Олена Оператор',
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];