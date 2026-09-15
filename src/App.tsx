import { useState } from 'react'
import type { FormEvent } from 'react'
import { initialProducts } from './data/products'
import { validateProductForm } from './validation'
import type { Product, ProductFormErrors, ProductFormState } from './types'
import './App.css'

const emptyForm: ProductFormState = { name: '', price: '' }

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [form, setForm] = useState<ProductFormState>(emptyForm)
  const [errors, setErrors] = useState<ProductFormErrors>({})

  const visibleProducts = inStockOnly
    ? products.filter((product) => product.inStock)
    : products

  const saleCount = products.filter((product) => product.onSale).length

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateProductForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const nextId = Math.max(0, ...products.map((product) => product.id)) + 1
    const newProduct: Product = {
      id: nextId,
      name: form.name.trim(),
      price: Number(form.price),
      category: 'New',
      inStock: true,
      onSale: false,
    }

    setProducts((currentProducts) => [...currentProducts, newProduct])
    setForm(emptyForm)
  }

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>Product Catalog</h1>
        <div className="catalog-meta">
          <p className="product-count">{visibleProducts.length} products</p>
          {saleCount > 0 && <p className="sale-counter">{saleCount} on sale</p>}
        </div>
        <label className="filter-toggle">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
          />
          In stock only
        </label>
      </header>

      <ul className="product-grid">
        {visibleProducts.map((product) => (
          <li key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <span className={product.inStock ? 'badge in-stock' : 'badge sold-out'}>
              {product.inStock ? 'In stock' : 'Sold out'}
            </span>
          </li>
        ))}
      </ul>

      <form className="add-product-form" onSubmit={handleSubmit} noValidate>
        <h2>Add product</h2>

        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>

        <label>
          Price
          <input
            type="text"
            inputMode="decimal"
            value={form.price}
            onChange={(event) => setForm({ ...form, price: event.target.value })}
          />
          {errors.price && <span className="field-error">{errors.price}</span>}
        </label>

        <button type="submit">Add product</button>
      </form>
    </div>
  )
}

export default App
