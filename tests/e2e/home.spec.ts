import { test, expect } from '@playwright/test';

test('has title and player', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cultura FM/i);

  // Check if the live player is present
  const playerBtn = page.getByRole('button', { name: /Ouvir rádio ao vivo|Pausar rádio/i });
  await expect(playerBtn).toBeVisible();
});
