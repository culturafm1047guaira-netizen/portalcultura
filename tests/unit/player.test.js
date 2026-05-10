describe('Player Utility Functions', () => {
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  test('shuffle returns same length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffleArray(arr).length).toBe(5);
  });

  test('shuffle contains all elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    arr.forEach(item => expect(shuffled).toContain(item));
  });
});