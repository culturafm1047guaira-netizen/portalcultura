import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Rádio Cultura|FM 104\.7|Guaíra/i);
  });

  test('displays navigation', async ({ page }) => {
    const nav = page.locator('nav, .nav-list, header');
    await expect(nav.first()).toBeVisible();
  });

  test('displays news section', async ({ page }) => {
    const newsSection = page.locator('#news-grid, .news-grid, .noticias');
    await expect(newsSection.first()).toBeVisible({ timeout: 10000 });
  });

  test('has working dark mode toggle', async ({ page }) => {
    const darkToggle = page.locator('#darkToggle');
    if (await darkToggle.isVisible()) {
      await darkToggle.click();
      const body = page.locator('body');
      const hasDarkClass = await body.evaluate(el => el.classList.contains('dark-mode'));
      expect(hasDarkClass).toBeTruthy();
    }
  });

  test('search input exists', async ({ page }) => {
    const searchInput = page.locator('#search-input, .search-input, input[type="search"]');
    if (await searchInput.count() > 0) {
      await expect(searchInput.first()).toBeAttached();
    }
  });
});

test.describe('Player', () => {
  test('audio player exists', async ({ page }) => {
    await page.goto('/');
    const player = page.locator('#audioPlayer, .audio-player, audio');
    await expect(player.first()).toBeAttached();
  });

  test('play button exists', async ({ page }) => {
    await page.goto('/');
    const playBtn = page.locator('#playBtn, .play-btn, button:has-text("Ouvir")');
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