import type { ChangeEvent } from 'react'

interface FilterToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function FilterToggle({ checked, onChange }: FilterToggleProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked)
  }

  return (
    <label className="filter-toggle">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      In stock only
    </label>
  )
}
