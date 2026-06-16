---
id: 01-branded-types
title: "Module 1 — Branded Types"
---

# 🏷️ Module 1 — Branded Types

**Durée estimée : 20 min**

## Le problème

```typescript
export type TicketId = string;
export type VisitorId = string;
export type Amount = number; // en quelle devise ? mystère...

// Rien n'empêche ceci de compiler :
const visitor = VisitorId("V-1");
refund(visitor, 25); // ✅ compile... mais c'est un bug !

const prix: Amount[] = [10, 5]; // euros ? dollars ?
```

`TicketId` et `VisitorId` sont deux alias de `string`. Pour TypeScript, ils sont **identiques**. On peut passer l'un où on attend l'autre — aucune erreur.

Même problème avec `Amount` : est-ce des euros ? des dollars ? On ne sait pas, et rien ne l'interdit.

## Objectif

Après votre refactor :

```typescript
// ❌ doit échouer à la compilation
const v: VisitorId = VisitorId("V-1");
refund(v, eur(10)); // VisitorId n'est pas un TicketId

// ❌ doit échouer à la compilation
const prix: EUR[] = [eur(10), usd(5)]; // USD dans un EUR[]
```

## La technique : Branded Types

Un **branded type** "étiquette" un type primitif avec un marqueur fantôme, invisible au runtime mais opaque pour le compilateur.

```typescript
declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };
```

Avec cette base, `Brand<string, "TicketId">` est un `string` au runtime, mais un type **incompatible** avec `Brand<string, "VisitorId">` au niveau des types.

:::tip Indice
La seule façon de créer un branded type est via un **constructeur explicite** :

```typescript
export const TicketId = (raw: string): TicketId => raw as TicketId;
```

Le `as` n'est utilisé qu'**une seule fois**, dans ce constructeur. Tout le reste du code est protégé automatiquement.
:::

## Fichier à modifier

`src/01-identifiers.ts`

## Validation

Après refactor, lancez :

```bash
npm run typecheck
```

Ajoutez ces lignes dans un fichier temporaire ou dans les tests — elles doivent produire des erreurs de compilation :

```typescript
// test-compile.ts
import { VisitorId, TicketId, refund, eur, usd } from "./src/01-identifiers.js";

const v = VisitorId("V-1");
refund(v, eur(10));           // ❌ Argument of type 'VisitorId' is not assignable to 'TicketId'

const prix: EUR[] = [eur(10), usd(5)]; // ❌ Type 'USD' is not assignable to type 'EUR'
```

Et les tests doivent rester verts :

```bash
npm test
```

<details>
<summary>💡 Solution complète</summary>

```typescript
declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };

export type TicketId = Brand<string, "TicketId">;
export type VisitorId = Brand<string, "VisitorId">;

export type EUR = Brand<number, "EUR">;
export type USD = Brand<number, "USD">;

// Constructeurs — la seule frontière où l'on "brande"
export const TicketId = (raw: string): TicketId => raw as TicketId;
export const VisitorId = (raw: string): VisitorId => raw as VisitorId;
export const eur = (n: number): EUR => n as EUR;
export const usd = (n: number): USD => n as USD;

export interface Ticket {
  id: TicketId;
  ownerId: VisitorId;
  price: EUR;
}

// On ne peut PLUS appeler refund(visitor.id, ...) : VisitorId != TicketId
export function refund(ticketId: TicketId, amount: EUR): string {
  if (amount < 0) throw new Error("Le montant ne peut pas être négatif");
  return `Remboursement de ${amount} pour le billet ${ticketId}`;
}

// total n'accepte que des EUR : impossible d'y glisser des USD
export function total(prices: EUR[]): EUR {
  return prices.reduce((acc, p) => (acc + p) as EUR, eur(0));
}
```

</details>

## Ce qu'on a gagné

- `refund(visitorId, ...)` → **erreur de compilation** (avant : bug silencieux)
- `[eur(10), usd(5)]` → **erreur de compilation** (avant : mélange silencieux)
- Zéro overhead runtime — `TicketId` est un `string` ordinaire à l'exécution
- Les constructeurs documentent **où** les données entrent dans le système

---

[→ Module 2 — Unions discriminées](/modules/02-discriminated-unions)
