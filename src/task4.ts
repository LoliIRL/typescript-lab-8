export function addTag(tags: readonly string[], tag: string): string[] {
  const exists = tags.some((t) => t.toLowerCase() === tag.toLowerCase());
  return exists ? [...tags] : [...tags, tag];
}

export function removeTag(tags: readonly string[], tag: string): string[] {
  const lower = tag.toLowerCase();
  return tags.filter((t) => t.toLowerCase() !== lower);
}

export function mergeTags(a: readonly string[], b: readonly string[]): string[] {
  const result: string[] = [];
  const seen = new Set<string>();
  for (const t of [...a, ...b]) {
    const key = t.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(t);
    }
  }
  return result;
}

console.log('task4:');
const base = ['vue', 'js'];
const added = addTag(base, 'TS');
const removed = removeTag(base, 'js');
const merged = mergeTags(['vue', 'js'], ['JS', 'ts']);
console.log(added, removed, merged);
console.log('Исходный не изменён:', base);