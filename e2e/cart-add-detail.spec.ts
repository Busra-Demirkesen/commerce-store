import { test, expect } from '@playwright/test';

test.describe('Add to cart via detail page (seeded)', () => {
  test('seed storage then open cart', async ({ page }) => {
    const seeded = {
      state: {
        items: [
          {
            id: 'p-1',
            name: 'Phone X',
            price: 999,
            isFeatured: true,
            stock: 10,
            category: { id: 'cat-phones', name: 'Phones', billboard: null },
            size: { id: 'size-s', name: 'Small', value: 'S' },
            color: { id: 'color-black', name: 'Black', value: '#000000' },
            images: [{ id: 'img-1', url: '/next.svg' }],
          },
        ],
      },
    };

    await page.addInitScript(value => {
      window.localStorage.setItem('cart-storage', JSON.stringify(value));
    }, seeded);

    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    await expect(page.getByText('Phone X', { exact: true })).toBeVisible();
  });
});
