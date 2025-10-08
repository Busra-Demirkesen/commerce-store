import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows navbar elements', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to be interactive
    await expect(page).toHaveURL(/\//);

    // Navbar should render the home link and logo (scoped)
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink.getByRole('img', { name: 'Techno Trend' })).toBeVisible();
  });
});
