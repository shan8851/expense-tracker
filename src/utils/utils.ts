export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export   const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
