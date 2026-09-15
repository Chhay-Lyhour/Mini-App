import type { PublicProduct } from '../types'

interface ProductCardProps {
  product: PublicProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <li className="product-card">
      <h2>{product.name}</h2>
      <p className="category">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <span className={product.inStock ? 'badge in-stock' : 'badge sold-out'}>
        {product.inStock ? 'In stock' : 'Sold out'}
      </span>
    </li>
  )
}
