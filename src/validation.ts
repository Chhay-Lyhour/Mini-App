import type { ProductFormDraft, ProductFormErrors } from './types'

// AI-generated per the module's co-pilot workflow — audit before trusting it.
export function validateProductForm(draft: ProductFormDraft): ProductFormErrors {
  const errors: ProductFormErrors = {}
  const name = draft.name ?? ''
  const price = draft.price ?? ''

  if (name.trim() === '') {
    errors.name = 'Name is required.'
  }

  const trimmedPrice = price.trim()
  const parsedPrice = Number(trimmedPrice)

  if (trimmedPrice === '' || Number.isNaN(parsedPrice)) {
    errors.price = 'Price must be a number.'
  } else if (parsedPrice <= 0) {
    errors.price = 'Price must be greater than zero.'
  }

  return errors
}
