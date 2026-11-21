export type UserId = string & { readonly brand: unique symbol };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUserId(value: unknown): value is UserId {
  return typeof value === 'string' && UUID_RE.test(value);
}

function getUserProfile(id: UserId): { id: UserId; name: string } {
  return { id, name: 'Демо-пользователь' };
}

console.log('task3:');
const good: unknown = '123e4567-e89b-12d3-a456-426614174000';
if (isUserId(good)) {
  console.log('Профиль:', getUserProfile(good));
}
const bad: unknown = 'not-a-uuid';
console.log('Некорректная строка:', isUserId(bad));
console.log('Не строка:', isUserId(123));