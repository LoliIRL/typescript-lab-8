export function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0 || !Number.isFinite(chunkSize)) {
    throw new RangeError(`Некорректный размер блока: ${chunkSize}`);
  }
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    result.push(items.slice(i, i + chunkSize));
  }
  return result;
}

console.log('task7:');
console.log(chunkArray([1, 2, 3, 4, 5], 2));
console.log(chunkArray(['a', 'b', 'c'], 5));
console.log(chunkArray([], 3));
try {
  chunkArray([1, 2], 0);
} catch (e) {
  console.log('Ожидаемая ошибка:', (e as Error).message);
}