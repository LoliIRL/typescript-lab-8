export function formatInput(value: number): string;
export function formatInput(value: string): string;
export function formatInput(value: Date): string;
export function formatInput(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  switch (typeof value) {
    case 'number':
      return value.toFixed(2);
    case 'string':
      return value.trim();
    default: {
      const _exhaustive: never = value;
      return _exhaustive;
    }
  }
}

console.log('task1:');
console.log(formatInput(3.14159));          // "3.14"
console.log(formatInput('  привет  '));     // "привет"
console.log(formatInput(new Date('2024-01-15T10:30:00Z'))); // ISO