import { test, expect } from '@playwright/test';

test.describe('Cart via E2E helper page', () => {
  test('seed cart and see item on cart page', async ({ page }) => {
    await page.goto('/__e2e__/add', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'E2E Add To Cart' })).toBeVisible();
    await expect(page.getByTestId('e2e-cart-count')).toHaveText('0');

    await page.getByTestId('e2e-seed').click();
    await expect(page.getByTestId('e2e-cart-count')).toHaveText('1');

    // Now cart page should show the item (middleware bypassed in E2E mode)
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    await expect(page.getByText('E2E Product')).toBeVisible();
  });
});

