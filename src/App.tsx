import { useState } from 'react'
import type { FormEvent } from 'react'
import { useProducts } from './hooks/useProducts'
import { validateProductForm } from './validation'
import { ProductGrid } from './components/ProductGrid'
import { FilterToggle } from './components/FilterToggle'
import { SaleCounter } from './components/SaleCounter'
import { AddProductForm } from './components/AddProductForm'
import type { Product, ProductFormDraft, ProductFormErrors, PublicProduct } from './types'
import './App.css'

function App() {
  const { products, setProducts, isLoading, error } = useProducts()
  const [inStockOnly, setInStockOnly] = useState(false)
  const [draft, setDraft] = useState<ProductFormDraft>({})
  const [errors, setErrors] = useState<ProductFormErrors>({})

  const publicProducts: PublicProduct[] = products.map(({ costPrice: _costPrice, ...rest }) => rest)

  const visibleProducts = inStockOnly
    ? publicProducts.filter((product) => product.inStock)
    : publicProducts

  const saleCount = products.filter((product) => product.onSale).length

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateProductForm(draft)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const name = draft.name ?? ''
    const price = Number(draft.price ?? '')
    const nextId = Math.max(0, ...products.map((product) => product.id)) + 1
    const newProduct: Product = {
      id: nextId,
      name: name.trim(),
      price,
      category: 'New',
      inStock: true,
      onSale: false,
      costPrice: price * 0.6,
    }

    setProducts((currentProducts) => [...currentProducts, newProduct])
    setDraft({})
  }

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>Product Catalog</h1>
        <div className="catalog-meta">
          <p className="product-count">{visibleProducts.length} products</p>
          {saleCount > 0 && <SaleCounter count={visibleProducts.length} />}
        </div>
        <FilterToggle checked={inStockOnly} onChange={setInStockOnly} />
      </header>

      {isLoading && <p className="status-message">Loading products…</p>}
      {error && <p className="status-message error">Couldn't load products: {error}</p>}
      {!isLoading && !error && <ProductGrid products={visibleProducts} />}

      <AddProductForm
        draft={draft}
        errors={errors}
        onNameChange={(value) => setDraft({ ...draft, name: value })}
        onPriceChange={(value) => setDraft({ ...draft, price: value })}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App
