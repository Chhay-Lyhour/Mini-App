import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Product } from '../types'

interface UseProductsResult {
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>
  isLoading: boolean
  error: string | null
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    async function loadProducts() {
      try {
        const response = await fetch('/products.json')
        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.status}`)
        }
        const data: Product[] = await response.json()
        if (!isCancelled) {
          setProducts(data)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load products.')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isCancelled = true
    }
  }, [])

  return { products, setProducts, isLoading, error }
}
