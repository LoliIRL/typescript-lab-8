export type DeepReadonly<T> =
  T extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

export function deepFreeze<T>(obj: T): DeepReadonly<T> {
  if (obj === null || typeof obj !== 'object') return obj as DeepReadonly<T>;
  const target = obj as Record<string, unknown>;
  for (const key of Object.keys(target)) {
    deepFreeze(target[key]);
  }
  Object.freeze(target);
  return obj as DeepReadonly<T>;
}

console.log('task9:');
const original = { a: { b: { c: 1 } }, list: [{ x: 2 }, { x: 3 }] };
const frozen = deepFreeze(original);
console.log('original frozen:', Object.isFrozen(original));
console.log('nested frozen:', Object.isFrozen(original.a.b), Object.isFrozen(original.list));
console.log('frozen value:', frozen.a.b.c);

// Недопустимое присваивание (ошибка типов):
// frozen.a.b.c = 99;
// frozen.list.push({ x: 4 });