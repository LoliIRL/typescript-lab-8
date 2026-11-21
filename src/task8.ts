export interface Repository<T extends { id: string }> {
  create(item: T): T;
  findById(id: string): T | undefined;
  update(id: string, changes: Partial<Omit<T, 'id'>>): T | undefined;
  delete(id: string): boolean;
}

export class MemoryRepository<T extends { id: string }> implements Repository<T> {
  private items = new Map<string, T>();

  create(item: T): T {
    if (this.items.has(item.id)) {
      throw new Error(`Сущность с id=${item.id} уже существует`);
    }
    this.items.set(item.id, item);
    return item;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  update(id: string, changes: Partial<Omit<T, 'id'>>): T | undefined {
    const existing = this.items.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...changes, id } as T;
    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

type Book = { id: string; title: string; author: string };

console.log('task8:');
const repo = new MemoryRepository<Book>();
console.log('create:', repo.create({ id: 'b1', title: 'Vue', author: 'Evan' }));
try {
  repo.create({ id: 'b1', title: 'Дубль', author: 'X' });
} catch (e) {
  console.log('Ожидаемая ошибка:', (e as Error).message);
}
console.log('update:', repo.update('b1', { title: 'Vue 3' }));
console.log('update missing:', repo.update('nope', { title: 'X' }));
console.log('find:', repo.findById('b1'));
console.log('delete:', repo.delete('b1'), repo.delete('b1'));