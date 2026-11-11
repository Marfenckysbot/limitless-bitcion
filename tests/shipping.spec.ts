import { test, expect } from '@playwright/test';

test('unauthenticated visitors are redirected to a usable sign-in page', async ({ page }) => {
  await page.goto('/shipping');
  await expect(page).toHaveURL(/\/auth\/signin/);
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
});
