describe('API Utility Functions', () => {
  const timeAgo = (date) => {
    const diff = Date.now() - date;
    const min = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (min < 1) return 'Agora';
    if (min < 60) return min + 'min atrás';
    if (h < 24) return h + 'h atrás';
    return d + 'd atrás';
  };

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  };

  const CATEGORY_MAP = {
    'Regional': { badge: 'badge-regional', cat: 'cat-regional', src: 'src-regional' },
    'Brasil': { badge: 'badge-brasil', cat: 'cat-brasil', src: 'src-brasil' },
    'Educação': { badge: 'badge-educacao', cat: 'cat-educacao', src: 'src-educacao' },
    'Justiça': { badge: 'badge-justica', cat: 'cat-justica', src: 'src-justica' },
    'Saúde': { badge: 'badge-saude', cat: 'cat-saude', src: 'src-saude' },
    'Esportes': { badge: 'badge-esportes', cat: 'cat-esportes', src: 'src-esportes' },
    'Facebook': { badge: 'badge-facebook', cat: 'cat-facebook', src: 'src-facebook' }
  };

  const badgeClass = (cat) => CATEGORY_MAP[cat]?.badge || 'badge-brasil';

  describe('timeAgo', () => {
    test('returns "Agora" for less than 1 minute', () => {
      const now = Date.now();
      expect(timeAgo(now)).toBe('Agora');
    });

    test('returns minutes for less than 60 minutes', () => {
      const now = Date.now();
      const tenMinAgo = now - 10 * 60 * 1000;
      expect(timeAgo(tenMinAgo)).toBe('10min atrás');
    });

    test('returns hours for less than 24 hours', () => {
      const now = Date.now();
      const threeHoursAgo = now - 3 * 60 * 60 * 1000;
      expect(timeAgo(threeHoursAgo)).toBe('3h atrás');
    });

    test('returns days for more than 24 hours', () => {
      const now = Date.now();
      const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000;
      expect(timeAgo(twoDaysAgo)).toBe('2d atrás');
    });
  });

  describe('escapeHtml', () => {
    test('escapes HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toContain('&lt;script&gt;');
      expect(escapeHtml('<script>alert("xss")</script>')).toContain('script');
    });

    test('handles empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    test('handles null/undefined', () => {
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });

    test('preserves normal text', () => {
      expect(escapeHtml('Olá Mundo')).toBe('Olá Mundo');
    });
  });

  describe('badgeClass', () => {
    test('returns correct badge for known categories', () => {
      expect(badgeClass('Regional')).toBe('badge-regional');
      expect(badgeClass('Brasil')).toBe('badge-brasil');
      expect(badgeClass('Educação')).toBe('badge-educacao');
      expect(badgeClass('Esportes')).toBe('badge-esportes');
    });

    test('returns default badge for unknown categories', () => {
      expect(badgeClass('Unknown')).toBe('badge-brasil');
    });
  });

  describe('CATEGORY_MAP', () => {
    test('contains all expected categories', () => {
      const expected = ['Regional', 'Brasil', 'Educação', 'Justiça', 'Saúde', 'Esportes', 'Facebook'];
      expected.forEach(cat => {
        expect(CATEGORY_MAP[cat]).toBeDefined();
        expect(CATEGORY_MAP[cat].badge).toBeDefined();
        expect(CATEGORY_MAP[cat].cat).toBeDefined();
        expect(CATEGORY_MAP[cat].src).toBeDefined();
      });
    });
  });
});