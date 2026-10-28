export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getPercent(saved: number, target: number): number {
  if (target <= 0) return 0
  return Math.min(100, Math.round((saved / target) * 100))
}