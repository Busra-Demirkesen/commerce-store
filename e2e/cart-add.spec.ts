import { test, expect } from '@playwright/test';

test.describe('Add to cart flow', () => {
  test('home list -> add -> cart storage has item', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Featured Products')).toBeVisible();
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();

    // Hover product card and click the cart icon (second button in hover actions)
    const card = page.locator('.group:has-text("Phone X")').first();
    await card.hover();
    await card.locator('button').nth(1).click();

    // Cart count in navbar should be 1
    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });
});
