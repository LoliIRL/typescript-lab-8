export function applyPipeline<A, B>(a: A, f1: (a: A) => B): B;
export function applyPipeline<A, B, C>(a: A, f1: (a: A) => B, f2: (b: B) => C): C;
export function applyPipeline<A, B, C, D>(
  a: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D
): D;
export function applyPipeline(a: unknown, ...fns: Array<(x: unknown) => unknown>): unknown {
  // Перегрузки гарантируют совместимость шагов на уровне типов,
  // поэтому внутри применяем приведение к unknown для реализации.
  return fns.reduce((acc, fn) => fn(acc), a);
}

console.log('task5:');
const one = applyPipeline(5, (n) => n * 2);
const two = applyPipeline(5, (n) => n * 2, (n) => `#${n}`);
const three = applyPipeline(5, (n) => n * 2, (n) => `#${n}`, (s) => s.length);
console.log(one, two, three);

// Несовместимый пример (ошибка типов):
// applyPipeline(5, (n) => n.toString(), (s: string) => s, (n: number) => n);