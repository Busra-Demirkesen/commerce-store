import { test, expect } from '@playwright/test';

test.describe('Category filters', () => {
  test('navigates to Phones and filters by size/color', async ({ page }) => {
    // Navigate directly to Phones category
    await page.goto('/category/cat-phones');
    await expect(page).toHaveURL(/\/category\/cat-phones/);

    // Initially shows the product from Phones category
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();
    await expect(page.getByText('Laptop Z', { exact: true })).toHaveCount(0);

    // Filter by size: Small (S) -- should still see Phone X
    await page.getByRole('button', { name: 'Small' }).click();
    await expect(page).toHaveURL(/sizeId=size-s/);
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();

    // Filter by color: White -- now no phones match (Phone X is Black)
    await page.getByRole('button', { name: 'White' }).click();
    await expect(page).toHaveURL(/colorId=color-white/);
    await expect(page.getByText('No Results', { exact: true })).toBeVisible();
  });
});
