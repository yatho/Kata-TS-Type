---
id: 03-exhaustiveness
title: "Module 3 — Exhaustivité"
---

# ✅ Module 3 — Exhaustivité

**Durée estimée : 15 min**

## Le problème

```typescript
export type PassKind = "single" | "day" | "season";

export function priceFor(kind: PassKind): number {
  switch (kind) {
    case "single":  return 25;
    case "day":     return 60;
    case "season":  return 300;
    default:
      return 0; // ← filet de sécurité runtime qui masque le vrai problème
  }
}
```

Ajoutez `"platinum"` à `PassKind`. Le code compile, les tests passent... mais `priceFor("platinum")` retourne silencieusement `0`.

**Le `default` avale le nouveau cas sans aucun signal.**

## Objectif

Après refactor, ajouter `"platinum"` à `PassKind` doit **casser la compilation** :

```
Type 'string' is not assignable to type 'never'.
```

Tant que vous n'avez pas ajouté `case "platinum":` dans le switch.

## La technique : `assertNever`

`assertNever` est une fonction qui prend un paramètre typé `never`. Si TypeScript peut l'atteindre, c'est qu'un cas a été oublié — erreur de compilation.

```typescript
function assertNever(x: never): never {
  throw new Error(`Cas non géré : ${x}`);
}
```

:::tip Indice
Remplacez `default: return 0` par `default: return assertNever(kind)`.

TypeScript sait que si tous les cas du switch sont couverts, `kind` est de type `never` dans le `default`. Si vous ajoutez un cas sans le traiter, `kind` n'est plus `never` → erreur.
:::

## Fichier à modifier

`src/03-exhaustiveness.ts`

## Validation

1. Refactorez `priceFor` avec `assertNever`
2. Ajoutez temporairement `"platinum"` à `PassKind`
3. `npm run typecheck` doit échouer avec une erreur sur `assertNever(kind)`
4. Ajoutez `case "platinum": return 500;` → la compilation passe
5. Retirez `"platinum"` (ou gardez-le avec son prix)

```bash
npm test  # Doit rester vert
```

<details>
<summary>💡 Solution complète</summary>

```typescript
function assertNever(x: never): never {
  throw new Error(`Cas non géré : ${JSON.stringify(x)}`);
}

export type PassKind = "single" | "day" | "season";

export function priceFor(kind: PassKind): number {
  switch (kind) {
    case "single":  return 25;
    case "day":     return 60;
    case "season":  return 300;
    default:        return assertNever(kind);
  }
}
```

</details>

## Ce qu'on a gagné

- Étendre l'union → **erreur de compilation immédiate** sur chaque switch non mis à jour
- Analyse d'impact gratuite : `tsc` liste tous les endroits à mettre à jour
- Plus de `default` silencieux qui masque des oublis

:::note `assertNever` en pratique
Cette fonction est si courante qu'elle existe dans des librairies comme `ts-essentials` (`UnreachableCaseError`). Mais l'implémentation maison de 3 lignes suffit parfaitement.
:::

---

[→ Module 4 — Template Literal Types](/modules/04-template-literal-types)
