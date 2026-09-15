interface SaleCounterProps {
  count: number
}

export function SaleCounter({ count }: SaleCounterProps) {
  return <p className="sale-counter">{count} on sale</p>
}
