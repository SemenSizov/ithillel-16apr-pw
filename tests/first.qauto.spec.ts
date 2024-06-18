import { test, expect } from '@playwright/test';

test('has title', {tag: '@regression'},  async ({ page }) => {
  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page.getByRole('button',{name: 'Guest log in'})).toBeVisible()
  await page.pause()
});
