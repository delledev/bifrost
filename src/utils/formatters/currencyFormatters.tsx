export default function FormatCurrency(value, currency) {
  if (!currency) {
    currency = 'TRY';
  }
  let currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  });

  return currencyFormatter.format(value);
}

export function GetFormatter(currency) {
  if (!currency) {
    currency = 'TRY';
  }
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  });

  return formatter;
}
