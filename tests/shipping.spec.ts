import { test, expect } from '@playwright/test';

test('shipping flow', async ({ page }) => {
  // Go to shipping page
  await page.goto('/shipping');
  
  // Should redirect to login if not authenticated
  expect(page.url()).toContain('/auth/signin');
  
  // TODO: Add login steps
  
  // Select shipping tier
  await page.click('text=White Glove Pickup');
  
  // Fill shipping details
  await page.fill('input[placeholder="Declared Value"]', '5000');
  await page.fill('input[placeholder="Street Address"]', '123 Test St');
  await page.fill('input[placeholder="City"]', 'Test City');
  await page.fill('input[placeholder="State"]', 'TS');
  await page.fill('input[placeholder="ZIP Code"]', '12345');
  await page.fill('input[placeholder="Country"]', 'United States');
  
  // Submit form
  await page.click('text=Get Shipping Quote');
  
  // Verify quote appears
  await expect(page.locator('text=Shipping Quote')).toBeVisible();
  await expect(page.locator('text=Base Fee')).toBeVisible();
});