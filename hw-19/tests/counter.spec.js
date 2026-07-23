import { test, expect } from '@playwright/test';

test.describe('E2E Тестування лічильника', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('відображення двох лічильників на головній сторінці', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'React Counter App' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Лічильник 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Лічильник 2' })).toBeVisible();
  });

  test('взаємодія з першим лічильником та перевірка історії', async ({ page }) => {
    const firstCounter = page.locator('.counter-card').nth(0);
    const incrementBtn = firstCounter.getByRole('button', { name: '+1' });
    const display = firstCounter.locator('.count-display');

    await expect(display).toHaveText('0');

    await incrementBtn.click();
    await incrementBtn.click();

    await expect(display).toHaveText('2');

    const historyItems = firstCounter.locator('.history li');
    await expect(historyItems).toHaveCount(2);
    await expect(historyItems.nth(0)).toHaveText('2');
    await expect(historyItems.nth(1)).toHaveText('1');
  });
});