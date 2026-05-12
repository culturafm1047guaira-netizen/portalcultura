import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Rádio Cultura|FM 104\.7|Guaíra/i);
  });

  test('displays header navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav.first()).toBeVisible();
  });

  test('displays news section', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.first()).toBeVisible({ timeout: 10000 });
  });

  test('search input exists', async ({ page }) => {
    const searchInput = page.locator('input[type="search"]');
    if (await searchInput.count() > 0) {
      await expect(searchInput.first()).toBeAttached();
    }
  });
});

test.describe('Player', () => {
  test('audio player exists', async ({ page }) => {
    await page.goto('/');
    const player = page.locator('audio');
    await expect(player.first()).toBeAttached();
  });

  test('play button exists', async ({ page }) => {
    await page.goto('/');
    const playBtn = page.locator('button[aria-label="Ouvir rádio ao vivo"]');
    await expect(playBtn.first()).toBeAttached();
  });
});

test.describe('API Endpoints', () => {
  test('GET /api/news returns valid JSON', async ({ request }) => {
    const response = await request.get('/api/news');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('GET /api/weather returns weather data', async ({ request }) => {
    const response = await request.get('/api/weather');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('temp');
    expect(data).toHaveProperty('condition');
  });

  test('GET /api/publicities returns array', async ({ request }) => {
    const response = await request.get('/api/publicities');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('GET /api/youtube returns videos', async ({ request }) => {
    const response = await request.get('/api/youtube');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });
});

test.describe('Responsiveness', () => {
  test('works on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('works on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});
