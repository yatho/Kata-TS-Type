---
id: 05-illegal-states
title: "Module 5 — États illégaux"
---

# 🚫 Module 5 — États illégaux non représentables

**Durée estimée : 25 min**

## Le problème

### Cas A — Booleans + champs optionnels couplés

```typescript
export interface Visitor {
  name: string;
  hasWristband: boolean;
  wristbandId?: string; // censé exister ssi hasWristband === true
}
```

L'état `{ hasWristband: true, wristbandId: undefined }` est **impossible dans le domaine**, mais **parfaitement légal dans le type**. Le `??` ci-dessous en est la preuve :

```typescript
function entryBadge(visitor: Visitor): string {
  if (visitor.hasWristband) {
    return `Bracelet n°${visitor.wristbandId ?? "??? (état incohérent)"}`;
    //                                          ^^^^^^^^^^^^^^^^^^^^^^^^
    //                                          Ce cas ne devrait pas exister
  }
  return `${visitor.name} : billet à scanner`;
}
```

### Cas B — Tableau vide interdit

```typescript
export function checkout(cart: Ticket[]): number {
  if (cart.length === 0) {
    throw new Error("Le panier est vide"); // runtime only
  }
  return cart.reduce((acc, t) => acc + t.price, 0);
}
```

`Ticket[]` inclut `[]`. La contrainte "au moins un élément" n'est pas encodée.

## Objectif

### Cas A

```typescript
checkout([]); // ❌ doit échouer à la compilation
```

### Cas B

```typescript
const v: Visitor = { name: "Mei", hasWristband: true }; // ❌ manque wristbandId
// OU : la variante "avec bracelet" doit exiger wristbandId
```

## La technique

### Cas A — Union à la place du booléen + optionnel

```typescript
type VisitorWithWristband    = { name: string; wristband: { id: string } };
type VisitorWithoutWristband = { name: string; wristband: null };
type Visitor = VisitorWithWristband | VisitorWithoutWristband;
```

L'état incohérent ne peut plus exister : soit `wristband` est un objet avec `id`, soit il est `null`.

### Cas B — `NonEmptyArray<T>`

```typescript
type NonEmptyArray<T> = [T, ...T[]];
```

Ce type est satisfait par `[item]`, `[a, b, c]`, mais **pas** par `[]`.

:::tip
Pour `NonEmptyArray`, TypeScript infère automatiquement que `arr[0]` est de type `T` (pas `T | undefined`), car la contrainte est dans le type.
:::

## Fichier à modifier

`src/05-illegal-states.ts`

## Validation

```bash
npm run typecheck
npm test
```

Vérifiez manuellement :

```typescript
// ❌ doit échouer
checkout([]);

// ❌ doit échouer (si vous avez choisi une union avec discriminant)
const v: Visitor = { name: "Mei", hasWristband: true };
// ou selon votre modèle :
const v2: VisitorWithWristband = { name: "Mei", wristband: null };
```

<details>
<summary>💡 Solution complète</summary>

```typescript
import type { Ticket } from "./01-identifiers.js";

// Cas A — union discriminée pour le bracelet
type WithWristband    = { name: string; wristband: { id: string } };
type WithoutWristband = { name: string; wristband: null };
export type Visitor   = WithWristband | WithoutWristband;

export function entryBadge(visitor: Visitor): string {
  if (visitor.wristband !== null) {
    // wristband.id est garanti — plus de ??
    return `Bracelet n°${visitor.wristband.id}`;
  }
  return `${visitor.name} : billet à scanner`;
}

// Cas B — NonEmptyArray
export type NonEmptyArray<T> = [T, ...T[]];

export function checkout(cart: NonEmptyArray<Ticket>): number {
  // cart.length >= 1 est garanti — plus de throw
  return cart.reduce((acc, t) => acc + t.price, 0);
}
```

</details>

## Ce qu'on a gagné

- `entryBadge` : le `?? "état incohérent"` **disparaît** — TypeScript le juge inutile
- `checkout([])` → **erreur de compilation** (avant : exception runtime)
- Les invariants du domaine vivent dans les types, pas dans les commentaires

---

[→ Module 6 — Frontière de parsing](/modules/06-parsing-boundary)
