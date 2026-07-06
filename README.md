# WAI-ARIA 1.3 Memory Test

A memory quiz to test how many roles and aria-* attributes defined in
[WAI-ARIA 1.3](https://www.w3.org/TR/wai-aria-1.3/) you can recall.

- `/` Top page (quiz selection and dark mode toggle)
- `/roles/` Guess the role. All 88 roles excluding abstract roles
- `/attributes/` Guess the aria-* attribute (states and properties). All 53 attributes. The `aria-` prefix can be omitted

HTML files live under `src/routes/`, and since vite's `root` is set to `src/routes`,
`routes` does not appear in the URL. JS files live under `src/scripts/`
(referenced from HTML as `/src/scripts/...` via an alias).

Original idea: [plfstr's HTML Tags Memory Test](https://codepen.io/plfstr)

## Usage

```bash
pnpm install
pnpm dev          # dev server
pnpm test         # logic tests (vitest)
pnpm build        # production build
pnpm preview      # preview the build output
```
