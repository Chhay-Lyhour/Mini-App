import type { ChangeEvent, FormEvent } from 'react'
import type { ProductFormDraft, ProductFormErrors } from '../types'

interface AddProductFormProps {
  draft: ProductFormDraft
  errors: ProductFormErrors
  onNameChange: (value: string) => void
  onPriceChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function AddProductForm({
  draft,
  errors,
  onNameChange,
  onPriceChange,
  onSubmit,
}: AddProductFormProps) {
  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    onNameChange(event.target.value)
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    onPriceChange(event.target.value)
  }

  return (
    <form className="add-product-form" onSubmit={onSubmit} noValidate>
      <h2>Add product</h2>

      <label>
        Name
        <input type="text" value={draft.name ?? ''} onChange={handleNameChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <label>
        Price
        <input
          type="text"
          inputMode="decimal"
          value={draft.price ?? ''}
          onChange={handlePriceChange}
        />
        {errors.price && <span className="field-error">{errors.price}</span>}
      </label>

      <button type="submit">Add product</button>
    </form>
  )
}
