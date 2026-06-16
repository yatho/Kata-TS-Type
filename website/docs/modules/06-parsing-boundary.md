---
id: 06-parsing-boundary
title: "Module 6 — Frontière de parsing"
---

# 🛡️ Module 6 — Frontière de parsing

**Durée estimée : 20 min**

## Le problème

```typescript
export function parseTicket(input: unknown): Ticket {
  return input as Ticket; // ❌ on ment au compilateur
}

export function priceOfFirst(rawTickets: unknown[]): number {
  const first = parseTicket(rawTickets[0]);
  return first.price; // peut exploser au runtime si la forme est mauvaise
}
```

`as Ticket` dit à TypeScript : *"fais-moi confiance, c'est un Ticket"*. Si `input` est `{ id: "T-1" }` sans `price`, aucune erreur de compilation — mais `first.price` sera `undefined` au runtime.

**L'assertion `as` est un mensonge au compilateur.** Le prix à payer apparaît loin dans le code, loin de la cause.

## Objectif

Remplacer le `as` par un **type predicate** qui valide réellement la donnée :

```typescript
function isTicket(x: unknown): x is Ticket { ... }

// Après refactor, parseTicket({ id: "T-1" }) doit lancer une exception
expect(() => parseTicket({ id: "T-1" })).toThrow();
```

## La technique : Type predicates

Un type predicate est une fonction qui retourne `x is T` — TypeScript réduit le type dans la branche `true` :

```typescript
function isString(x: unknown): x is string {
  return typeof x === "string";
}

if (isString(value)) {
  // ici, value est de type string — garanti par la vérification réelle
  value.toUpperCase(); // ✅
}
```

Pour valider un objet structuré comme `Ticket`, il faut vérifier chaque champ :

```typescript
function isTicket(x: unknown): x is Ticket {
  return (
    typeof x === "object" &&
    x !== null &&
    "id" in x && typeof (x as any).id === "string" &&
    "ownerId" in x && typeof (x as any).ownerId === "string" &&
    "price" in x && typeof (x as any).price === "number"
  );
}
```

:::tip Indice
`parseTicket` devient : si `isTicket(input)` → retourner `input`, sinon → lancer une erreur. Plus aucun `as`.

Pour les branded types du Module 1, la validation doit vérifier le type de base (`string`, `number`) — pas le brand, qui n'existe qu'à la compilation.
:::

## Fichier à modifier

`src/06-parsing-boundary.ts`

## Validation

```bash
npm run typecheck
npm test
```

Le test suivant doit passer (ajoutez-le si absent) :

```typescript
it("rejette une donnée malformée", () => {
  expect(() => parseTicket({ id: "T-1" })).toThrow(); // manque ownerId et price
  expect(() => parseTicket(null)).toThrow();
  expect(() => parseTicket("string")).toThrow();
});
```

<details>
<summary>💡 Solution complète</summary>

```typescript
import type { Ticket } from "./01-identifiers.js";
import { TicketId, VisitorId, eur } from "./01-identifiers.js";

function isTicket(x: unknown): x is Ticket {
  return (
    typeof x === "object" &&
    x !== null &&
    "id" in x && typeof (x as Record<string, unknown>).id === "string" &&
    "ownerId" in x && typeof (x as Record<string, unknown>).ownerId === "string" &&
    "price" in x && typeof (x as Record<string, unknown>).price === "number"
  );
}

export function parseTicket(input: unknown): Ticket {
  if (!isTicket(input)) {
    throw new Error(`Données invalides : ${JSON.stringify(input)}`);
  }
  // Ici input est garanti Ticket — le compilateur le sait
  return {
    id: TicketId(input.id as string),
    ownerId: VisitorId(input.ownerId as string),
    price: eur(input.price as number),
  };
}

export function priceOfFirst(rawTickets: unknown[]): number {
  const first = parseTicket(rawTickets[0]);
  return first.price; // garanti number, pas de surprise runtime
}
```

</details>

## Ce qu'on a gagné

- Un seul `as` dans tout le codebase (dans les branded constructors) — et non plus dispersé
- Les données invalides sont rejetées **à l'entrée du système**, pas au moment de l'utilisation
- Le reste du code fait confiance au type `Ticket` sans vérification défensive

## Le principe général : Parse, Don't Validate

> **"Parse, don't validate"** (Alexis King, 2019)

Validation : vérifier une donnée et retourner `boolean`.
Parsing : vérifier une donnée et retourner un type plus riche — ou échouer explicitement.

Le parsing déplace la responsabilité de la vérification **vers la frontière du système** (HTTP handler, lecture de fichier, deserialization). L'intérieur du système ne valide plus — il fait confiance aux types.

---

[→ Aller plus loin 🚀](/going-further)
