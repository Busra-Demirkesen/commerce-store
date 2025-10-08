import { test, expect } from '@playwright/test';

test.describe('Add to cart flow', () => {
  test('home list -> add -> cart storage has item', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Featured Products')).toBeVisible();
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();

    
    const card = page.locator('.group:has-text("Phone X")').first();
    await card.hover();
    await card.locator('button').nth(1).click();

    // Navigate to cart via navbar button and assert item
    await page.getByRole('button').filter({ hasText: /^\s*\d+\s*$/ }).click();
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();
  });
});
