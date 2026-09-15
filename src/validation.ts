import type { ProductFormErrors, ProductFormState } from './types'

// AI-generated per the module's co-pilot workflow — audit before trusting it.
export function validateProductForm(form: ProductFormState): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if (form.name.trim() === '') {
    errors.name = 'Name is required.'
  }

  const trimmedPrice = form.price.trim()
  const parsedPrice = Number(trimmedPrice)

  if (trimmedPrice === '' || Number.isNaN(parsedPrice)) {
    errors.price = 'Price must be a number.'
  } else if (parsedPrice <= 0) {
    errors.price = 'Price must be greater than zero.'
  }

  return errors
}
