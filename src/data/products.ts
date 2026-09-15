import type { Product } from '../types'

export const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Mouse', price: 24.99, category: 'Accessories', inStock: true, onSale: true },
  { id: 2, name: 'Mechanical Keyboard', price: 89.5, category: 'Accessories', inStock: true, onSale: false },
  { id: 3, name: '27" Monitor', price: 219, category: 'Displays', inStock: false, onSale: false },
  { id: 4, name: 'USB-C Hub', price: 39.99, category: 'Accessories', inStock: true, onSale: true },
  { id: 5, name: 'Standing Desk', price: 349, category: 'Furniture', inStock: false, onSale: false },
  { id: 6, name: 'Webcam 1080p', price: 45, category: 'Accessories', inStock: true, onSale: false },
  { id: 7, name: 'Noise-Cancelling Headphones', price: 129.99, category: 'Audio', inStock: true, onSale: true },
  { id: 8, name: 'Laptop Stand', price: 29.99, category: 'Accessories', inStock: false, onSale: false },
]
