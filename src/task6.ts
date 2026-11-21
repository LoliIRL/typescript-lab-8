export type Invoice = { id: string; amount: number; status: 'paid' | 'free' };

export function sumByStatus(invoices: readonly Invoice[]): { paid: number; free: number } {
  return invoices.reduce(
    (acc, inv) => {
      acc[inv.status] += inv.amount;
      return acc;
    },
    { paid: 0, free: 0 }
  );
}

console.log('task6:');
const invoices: Invoice[] = [
  { id: '1', amount: 100, status: 'paid' },
  { id: '2', amount: 50, status: 'free' },
  { id: '3', amount: 200, status: 'paid' },
];
console.log(sumByStatus(invoices));
console.log(sumByStatus([]));