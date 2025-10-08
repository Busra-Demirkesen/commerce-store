import { test, expect } from '@playwright/test';

test.describe('Category filters', () => {
  test('navigates to Phones and filters by size/color', async ({ page }) => {
    
    await page.goto('/category/cat-phones');
    await expect(page).toHaveURL(/\/category\/cat-phones/);

    
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();
    await expect(page.getByText('Laptop Z', { exact: true })).toHaveCount(0);

    
    await page.getByRole('button', { name: 'Small' }).click();
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();

    
    await page.getByRole('button', { name: 'White' }).click();
    await expect(page.getByText('No Results', { exact: true })).toBeVisible();
  });
});
