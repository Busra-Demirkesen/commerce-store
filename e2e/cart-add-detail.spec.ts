import { test, expect } from '@playwright/test';

test.describe('Add to cart via detail page', () => {
  test('go to product page and add to cart', async ({ page }) => {
    await page.goto('/product/p-1', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Phone X' })).toBeVisible();

    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Navigate to cart via navbar button to avoid full reloads
    // The cart button contains the count text
    await page.getByRole('button').filter({ hasText: /^\s*\d+\s*$/ }).click();
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();
  });
});
