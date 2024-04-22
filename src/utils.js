export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "inr",
  style: "currency",
  minimumFractionDigits: 0,
})

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}