import { test, expect } from '@playwright/test';

test.describe('Cart via seeded localStorage', () => {
  test('seed to E2E product and assert cart', async ({ page }) => {
    const seeded = {
      state: {
        items: [
          {
            product: {
              id: 'e2e-p',
              name: 'E2E Product',
              price: 123,
              isFeatured: false,
              stock: 1,
              category: { id: 'e2e-cat', name: 'E2E', billboard: null },
              size: { id: 'e2e-size', name: 'One', value: 'ONE' },
              color: { id: 'e2e-color', name: 'Gray', value: '#888888' },
              images: [{ id: 'e2e-img', url: '/next.svg' }],
            },
            quantity: 1,
          },
        ],
      },
    };

    await page.addInitScript(value => {
      window.localStorage.setItem('cart-storage', JSON.stringify(value));
    }, seeded);

    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    await expect(page.getByText('E2E Product')).toBeVisible();
  });
});
