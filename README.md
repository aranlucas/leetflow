# LeetFlow

From problem statement to pattern in 30 seconds.

An interactive decision flowchart for LeetCode-style problems: answer 2–4
questions about your input and output, land on the right pattern, copy a Python
template, and solve 3 curated problems that teach it best.

## What's inside

- **Interactive flowchart** — custom decision / pattern nodes, guided walk mode,
  top-down or left-right layout, minimap + controls
- **Pattern finder sidebar** — fuzzy search across 12 patterns with progress tracking
- **Pattern library** — signals, Python starter template (copy button), complexity,
  and curated LeetCode problems per pattern
- **Learned tracking** — mark patterns learned, persisted to localStorage
- **Dark mode** — polished for late-night grinding

## Patterns covered

Two Pointers · Sliding Window · Binary Search · Hash Map/Set · Stack ·
Heap · Backtracking · DP · Greedy · Trie · Monotonic Queue · Graph (BFS/DFS)

## Develop

```bash
pnpm install
pnpm dev
```

```bash
pnpm typecheck  # TypeScript 7, strict
pnpm lint       # oxlint, all categories denied, warnings fail
pnpm format:check  # oxfmt (sorts imports + Tailwind classes)
pnpm build
```

## Toolchain

- Next.js 16 + React 19 + TypeScript 7
- Tailwind CSS v4 (CSS-first config in `styles/globals.css`)
- XY Flow v12 (`@xyflow/react`) + `@dagrejs/dagre` for layout
- oxlint + oxfmt instead of ESLint/Prettier (typescript-eslint doesn't
  support TS 7 yet, and `eslint-config-next` hard-requires it — see the note
  in `.oxlintrc.json`)
- Type-aware linting via `oxlint-tsgolint` (stable v7, built on the official
  TypeScript Go compiler): `pnpm lint` runs `oxlint --type-aware`, covering
  59 of typescript-eslint's 61 type-aware rules (floating promises, unsafe
  `any` propagation, deprecated React 19 APIs, …)
