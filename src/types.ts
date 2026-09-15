export interface Product {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
  onSale: boolean
  costPrice: number
}

export type PublicProduct = Omit<Product, 'costPrice'>

export interface ProductFormState {
  name: string
  price: string
}

export type ProductFormDraft = Partial<ProductFormState>

export interface ProductFormErrors {
  name?: string
  price?: string
}
