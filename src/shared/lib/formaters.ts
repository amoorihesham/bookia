export function formateCurrecny(amount: number | string) {
  const inSureNumber = typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol',
  }).format(inSureNumber);
}
