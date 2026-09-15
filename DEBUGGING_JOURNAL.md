# Debugging Journal

Three bugs were planted on the `debug-hunt` branch, then found and fixed using the DevTools workflow named for each one.

## Bug 1 — Crash: blank page on load

- **Symptom:** the app rendered a completely blank white page. Nothing in the DOM at all.
- **Tool:** browser debugger / uncaught exception stack trace (Sources panel — pause on exceptions).
- **What it showed:** the trace pointed straight at `App.tsx:18`, inside `products.map(...)` (the line that strips the internal `costPrice` field): `TypeError: Cannot read properties of null (reading 'map')`. Tracing `products` back to its source in `useProducts.ts` showed:

  ```ts
  const [products, setProducts] = useState<Product[]>(null as unknown as Product[])
  ```

  The initial state was `null`, with an `as unknown as Product[]` cast hiding it from the type-checker. `tsc --noEmit` stayed clean because the cast lies to the compiler — the crash only exists at runtime, on the very first render, before the fetch in `useEffect` has a chance to resolve.
- **Fix:** initialize the state honestly: `useState<Product[]>([])`.

## Bug 2 — Silent wrong value: sale counter off by 5

- **Symptom:** no crash, no console error. The header read **"8 on sale"**, but only 3 of the 8 products are actually flagged `onSale: true`.
- **Tool:** React DevTools (Components panel), inspecting `<SaleCounter>`'s props.
- **What it showed:** `<SaleCounter>`'s `count` prop was wired to `visibleProducts.length` instead of the `saleCount` variable computed two lines above it in `App.tsx`:

  ```tsx
  const saleCount = products.filter((product) => product.onSale).length
  // ...
  {saleCount > 0 && <SaleCounter count={visibleProducts.length} />}
  ```

  Both `saleCount` and `visibleProducts.length` are plain `number`s, so TypeScript had no basis to object — this was a same-typed variable swap, structurally invisible to the compiler. The DevTools props panel showed `count: 8` on the component itself, which didn't match the value `saleCount` held in `App`'s hooks panel one level up — that mismatch is what gave it away.
- **Fix:** `<SaleCounter count={saleCount} />`.

## Bug 3 — Network failure: mistyped fetch URL

- **Symptom:** the grid never rendered. Instead, a red message read: `Couldn't load products: Unexpected token '<', "<!doctype "... is not valid JSON`.
- **Tool:** Network tab.
- **What it showed:** `useProducts.ts` called `fetch('/prodcuts.json')` — a letter transposition — instead of `/products.json`. Because Vite's dev server serves an SPA fallback for unknown paths, the typo'd request didn't even 404: it came back **200 OK**, body `text/html` (the fallback `index.html`). The failure only surfaced when `response.json()` tried to parse that HTML as JSON. The status column alone was misleading; confirming the real problem required opening the response body/preview, not just glancing at the status code.
- **Fix:** `fetch('/products.json')`.

## One-sentence summary

The debugger's stack trace pinpointed the crash's exact line and the `null` value in one step; React DevTools' props panel exposed a same-typed variable swap that no type error or runtime exception would ever surface; and the Network tab caught the mistyped URL — but the console alone was not enough for either of the last two, since bug 2 threw nothing at all and bug 3's request looked like a normal `200 OK` success until the response body was actually inspected.
