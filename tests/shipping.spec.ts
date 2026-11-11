import { test, expect } from '@playwright/test';

test('unauthenticated visitors are redirected away from shipping', async ({ page }) => {
  await page.goto('/shipping');
  await expect(page).toHaveURL(/\/auth\/signin/);
  await expect(page.locator('form')).toBeVisible();
});
