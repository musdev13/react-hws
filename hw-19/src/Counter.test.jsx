import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach } from 'vitest';
import Counter from './Counter';

describe('Counter Component', () => {

  beforeEach(() => {
    render(<Counter title="Тестовий лічильник" />);
  });

  const getCountDisplay = () => screen.getByRole('heading', { level: 2 }).parentElement.querySelector('.count-display');

  test('початковий стан: відображає 0 та необхідні кнопки', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Тестовий лічильник');
    expect(getCountDisplay()).toHaveTextContent('0');
    expect(screen.getByRole('button', { name: '+1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Скинути' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Змінити колір' })).toBeInTheDocument();
  });

  test('збільшення та зменшення значення лічильника', async () => {
    const user = userEvent.setup();
    const plusBtn = screen.getByRole('button', { name: '+1' });
    const minusBtn = screen.getByRole('button', { name: '-1' });

    await user.click(plusBtn);
    expect(getCountDisplay()).toHaveTextContent('1');

    await user.click(plusBtn);
    expect(getCountDisplay()).toHaveTextContent('2');

    await user.click(minusBtn);
    expect(getCountDisplay()).toHaveTextContent('1');
  });

  test('додавання значень у список історії та обмеження до 5 елементів', async () => {
    const user = userEvent.setup();
    const plusBtn = screen.getByRole('button', { name: '+1' });

    for (let i = 1; i <= 6; i++) {
      await user.click(plusBtn);
    }

    const historyItems = screen.getAllByRole('listitem');
    expect(historyItems).toHaveLength(5);
    expect(historyItems[0]).toHaveTextContent('6');
    expect(historyItems[4]).toHaveTextContent('2');
  });

  test('кнопка скидання скидає лічильник до 0 та оновлює історію', async () => {
    const user = userEvent.setup();
    const plusBtn = screen.getByRole('button', { name: '+1' });
    const resetBtn = screen.getByRole('button', { name: 'Скинути' });

    await user.click(plusBtn);
    await user.click(plusBtn);
    expect(getCountDisplay()).toHaveTextContent('2');

    await user.click(resetBtn);
    expect(getCountDisplay()).toHaveTextContent('0');
    
    const historyItems = screen.getAllByRole('listitem');
    expect(historyItems[0]).toHaveTextContent('0');
  });

  test('перемикання стилю (колір) при кліку на відповідну кнопку', async () => {
    const user = userEvent.setup();
    const toggleBtn = screen.getByRole('button', { name: 'Змінити колір' });
    const card = screen.getByRole('heading', { level: 2 }).parentElement;

    expect(card).not.toHaveClass('colored');

    await user.click(toggleBtn);
    expect(card).toHaveClass('colored');

    await user.click(toggleBtn);
    expect(card).not.toHaveClass('colored');
  });
});