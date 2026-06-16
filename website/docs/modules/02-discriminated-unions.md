---
id: 02-discriminated-unions
title: "Module 2 — Unions Discriminées"
---

# 🔀 Module 2 — Unions Discriminées

**Durée estimée : 20 min**

## Le problème

```typescript
export interface Attraction {
  name: string;
  status: "open" | "closed" | "maintenance";
  waitTimeMinutes?: number;  // valable seulement si open
  reopensAt?: Date;          // valable seulement si maintenance
  closureReason?: string;    // valable seulement si closed
}
```

Tous les champs sont dans le même objet plat. Une attraction `"closed"` **peut** avoir `waitTimeMinutes: 10` — le type ne l'interdit pas.

Résultat dans le code : des `?.` et `??` défensifs partout, même là où on a déjà vérifié le statut.

```typescript
function describe(attraction: Attraction): string {
  if (attraction.status === "open") {
    // On DOIT mettre un fallback : le type ne garantit rien
    return `${attraction.name} est ouverte (attente ${attraction.waitTimeMinutes ?? 0} min)`;
  }
  // ...
}
```

## Objectif

Après refactor :

```typescript
// ❌ doit échouer à la compilation
const a: Attraction = {
  status: "closed",
  name: "X",
  waitTimeMinutes: 10, // ce champ n'existe pas sur la variante closed
};
```

Et dans `describe`, plus aucun `?.` ni `??` ne doit être nécessaire.

## La technique : Union discriminée

Plutôt qu'un objet plat avec des champs optionnels, créez **une union de types** où chaque variante porte uniquement ses données pertinentes :

```typescript
type Attraction =
  | { kind: "open";        name: string; waitTimeMinutes: number }
  | { kind: "maintenance"; name: string; reopensAt: Date }
  | { kind: "closed";      name: string; closureReason: string };
```

Le champ `kind` (ou `status`, `type`, `_tag`...) est le **discriminant** : TypeScript s'en sert pour réduire le type dans chaque branche du `if`.

:::tip Indice
Après le refactor, dans la branche `if (attraction.status === "open")`, TypeScript sait que `waitTimeMinutes` est un `number` — pas `number | undefined`. Les `??` disparaissent naturellement.
:::

## Fichier à modifier

`src/02-attraction-state.ts`

## Validation

```bash
npm run typecheck  # Pas d'erreur dans le code refactoré
npm test           # Les tests restent verts
```

Testez manuellement que ceci échoue à la compilation :

```typescript
const a: Attraction = { status: "closed", name: "X", waitTimeMinutes: 10 };
// ❌ Object literal may only specify known properties...
```

<details>
<summary>💡 Solution complète</summary>

```typescript
type OpenAttraction = {
  status: "open";
  name: string;
  waitTimeMinutes: number;
};

type MaintenanceAttraction = {
  status: "maintenance";
  name: string;
  reopensAt: Date;
};

type ClosedAttraction = {
  status: "closed";
  name: string;
  closureReason: string;
};

export type Attraction = OpenAttraction | MaintenanceAttraction | ClosedAttraction;

export function describe(attraction: Attraction): string {
  if (attraction.status === "open") {
    // waitTimeMinutes est garanti number — plus de ??
    return `${attraction.name} est ouverte (attente ${attraction.waitTimeMinutes} min)`;
  }
  if (attraction.status === "maintenance") {
    // reopensAt est garanti Date — plus de ?.
    return `${attraction.name} rouvre le ${attraction.reopensAt.toISOString()}`;
  }
  return `${attraction.name} est fermée : ${attraction.closureReason}`;
}
```

</details>

## Ce qu'on a gagné

- Les champs invalides pour un état **n'existent pas** dans ce type
- Les narrowings TypeScript éliminent les `?.` et `??` défensifs
- Ajouter un état → ajouter une variante → le compilateur signale les endroits oubliés

---

[→ Module 3 — Exhaustivité](/modules/03-exhaustiveness)
