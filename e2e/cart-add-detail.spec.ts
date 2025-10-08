import { test, expect } from '@playwright/test';

test.describe('Add to cart via detail page', () => {
  test('go to product page and add to cart', async ({ page }) => {
    await page.goto('/product/p-1', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Phone X' })).toBeVisible();

    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Cart count in navbar should be 1
    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });
});
