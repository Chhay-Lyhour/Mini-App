import type { PublicProduct } from '../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: PublicProduct[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}
