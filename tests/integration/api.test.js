import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('API Integration Tests', () => {
  describe('api/news.js structure', () => {
    test('api/news.js exists and is readable', () => {
      const newsApi = join(__dirname, '../../api/news.js');
      const content = readFileSync(newsApi, 'utf-8');
      expect(content).toContain('export default');
      expect(content).toContain('handler');
    });

    test('has feed configuration', () => {
      const newsApi = join(__dirname, '../../api/news.js');
      const content = readFileSync(newsApi, 'utf-8');
      expect(content).toContain('FEEDS');
      expect(content).toContain('rss-parser');
    });
  });

  describe('api/weather.js structure', () => {
    test('api/weather.js exists and is readable', () => {
      const weatherApi = join(__dirname, '../../api/weather.js');
      const content = readFileSync(weatherApi, 'utf-8');
      expect(content).toContain('export default');
      expect(content).toContain('handler');
    });

    test('uses wttr.in API', () => {
      const weatherApi = join(__dirname, '../../api/weather.js');
      const content = readFileSync(weatherApi, 'utf-8');
      expect(content).toContain('wttr.in');
    });
  });

  describe('api/publicities.js structure', () => {
    test('api/publicities.js exists', () => {
      const pubApi = join(__dirname, '../../api/publicities.js');
      const content = readFileSync(pubApi, 'utf-8');
      expect(content).toContain('export default');
    });

    test('reads from Publicidades directory', () => {
      const pubApi = join(__dirname, '../../api/publicities.js');
      const content = readFileSync(pubApi, 'utf-8');
      expect(content).toContain('Publicidades');
    });
  });

  describe('api/youtube.js structure', () => {
    test('api/youtube.js exists', () => {
      const ytApi = join(__dirname, '../../api/youtube.js');
      const content = readFileSync(ytApi, 'utf-8');
      expect(content).toContain('export default');
    });

    test('has fallback for missing API key', () => {
      const ytApi = join(__dirname, '../../api/youtube.js');
      const content = readFileSync(ytApi, 'utf-8');
      expect(content).toContain('fallbackVideos');
    });
  });

  describe('File system checks', () => {
    test('Publicidades directory exists', () => {
      const pubDir = join(__dirname, '../../Publicidades');
      expect(existsSync(pubDir)).toBe(true);
    });

    test('api directory has expected files', () => {
      const apiDir = join(__dirname, '../../api');
      const files = readdirSync(apiDir);
      expect(files).toContain('news.js');
      expect(files).toContain('weather.js');
      expect(files).toContain('publicities.js');
      expect(files).toContain('youtube.js');
    });
  });
});