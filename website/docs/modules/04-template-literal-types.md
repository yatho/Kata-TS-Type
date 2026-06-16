---
id: 04-template-literal-types
title: "Module 4 — Template Literal Types"
---

# 🔤 Module 4 — Template Literal Types

**Durée estimée : 20 min**

## Le problème

```typescript
export type ZoneCode = string; // "A-12", "B-07", ... ou n'importe quoi

const ZONE_PATTERN = /^[A-E]-\d{2}$/;

export function locate(code: ZoneCode): string {
  if (!ZONE_PATTERN.test(code)) {
    throw new Error(`Code de zone invalide : ${code}`); // runtime only
  }
  const sector = code[0];
  return `Secteur ${sector}, emplacement ${code}`;
}

// Rien n'empêche ceci de compiler :
export const broken: ZoneCode = "pas un code"; // ✅ compile
```

Le type `ZoneCode = string` n'encode aucune contrainte de forme. Chaque fonction qui reçoit un `ZoneCode` doit valider à nouveau — ou espérer que quelqu'un l'a fait avant.

## Objectif

Après refactor :

```typescript
const z: ZoneCode = "pas un code"; // ❌ Type '"pas un code"' is not assignable to type 'ZoneCode'
const ok: ZoneCode = "A-12";       // ✅

locate("nope"); // ❌ à la compilation (plus seulement au runtime)
```

Et `locate` ne doit plus appeler la regex — le type garantit déjà la forme.

## La technique : Template Literal Types

TypeScript permet de décrire la **structure** d'une string au niveau des types :

```typescript
type Sector = "A" | "B" | "C" | "D" | "E";
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type ZoneCode = `${Sector}-${Digit}${Digit}`;
```

Ce type décrit exactement les strings de la forme `"A-12"`, `"E-07"`, etc.

:::tip Indice
Pour les strings **dynamiques** venant de l'extérieur (user input, API), le type compile-time ne suffit pas. Exposez une fonction `isZoneCode(s: string): s is ZoneCode` qui valide la regex une seule fois à la frontière.
:::

## Fichier à modifier

`src/04-zone-codes.ts`

## Validation

```bash
npm run typecheck
npm test
```

Vérifiez :
- `const ok: ZoneCode = "A-12"` compile
- `const bad: ZoneCode = "Z-99"` échoue (Z n'est pas un secteur valide)
- `const bad2: ZoneCode = "A-1"` échoue (un seul chiffre)
- `locate` ne contient plus de `.test()`

<details>
<summary>💡 Solution complète</summary>

```typescript
type Sector = "A" | "B" | "C" | "D" | "E";
type TwoDigits = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
export type ZoneCode = `${Sector}-${TwoDigits}`;

const ZONE_PATTERN = /^[A-E]-\d{2}$/;

export function isZoneCode(s: string): s is ZoneCode {
  return ZONE_PATTERN.test(s);
}

export function locate(code: ZoneCode): string {
  // Pas de validation ici : le type garantit que code est bien formé
  const sector = code[0] as Sector;
  return `Secteur ${sector}, emplacement ${code}`;
}
```

</details>

## Ce qu'on a gagné

- Les littéraux invalides sont rejetés **à la compilation**
- `locate` ne valide plus — elle fait confiance au type
- Un seul point de validation : `isZoneCode`, à la frontière (ex: lecture d'un fichier CSV)

:::note Limites
Les template literal types ne peuvent pas encoder toutes les regex. Ils fonctionnent parfaitement pour des formes structurées (codes, slugs, préfixes). Pour des règles complexes (longueur variable, lookaheads), les type predicates (Module 6) prennent le relais.
:::

---

[→ Module 5 — États illégaux](/modules/05-illegal-states)
