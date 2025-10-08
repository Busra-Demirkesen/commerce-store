import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows navbar elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\//);
    
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink.getByRole('img', { name: 'Techno Trend' })).toBeVisible();
  });
});
