---
id: intro
title: Introduction
---

# Type-Driven Kata

> **Thèse** : rendre les états invalides impossibles à représenter — et faire porter les garanties par le **compilateur** plutôt que par des contrôles dispersés au runtime.

## Le problème

Dans la plupart des codebases TypeScript, on retrouve ce genre de code :

```typescript
interface Visitor {
  hasWristband: boolean;
  wristbandId?: string; // censé exister ssi hasWristband === true
}

function entryBadge(visitor: Visitor): string {
  if (visitor.hasWristband) {
    return `Bracelet n°${visitor.wristbandId ?? "??? (état incohérent)"}`;
  }
  return `${visitor.name} : billet à scanner`;
}
```

Le `?? "??? (état incohérent)"` n'est pas un accident — c'est le signe que le **type ment**. L'état `hasWristband: true` + `wristbandId: undefined` est impossible dans le domaine, mais parfaitement représentable dans le type.

**Ce kata vous apprend à éliminer cette catégorie de bugs à la source.**

## Ce que vous allez apprendre

| # | Technique | Ce qu'elle élimine |
|---|-----------|-------------------|
| 1 | **Branded types** | Confusions d'identifiants (`TicketId` vs `VisitorId`) |
| 2 | **Unions discriminées** | Champs optionnels liés à un état |
| 3 | **Exhaustivité** (`assertNever`) | Cas oubliés lors d'une extension |
| 4 | **Template literal types** | Strings non validées passant partout |
| 5 | **États illégaux non représentables** | Combinaisons de champs incohérentes |
| 6 | **Type predicates** | `as` et assertions non vérifiées |

## Comment fonctionne ce kata

Chaque module suit le même schéma :

1. **Code naïf** — le problème illustré avec du TypeScript "classique"
2. **Objectif** — ce que vous devez atteindre
3. **Indice** — la technique à utiliser (sans donner la solution)
4. **Validation** — comment savoir que vous avez réussi
5. **Solution** — le code final commenté

:::tip
Résistez à l'envie de lire la solution en premier. Le moment où le compilateur refuse quelque chose qui compilait avant — c'est *ça* le kata.
:::

## Prérequis

- TypeScript intermédiaire (vous savez lire les erreurs `tsc`)
- Node.js 18+

Aucune connaissance de patterns avancés requise — vous les découvrez ici.

---

Prêt ? → [Installation ⚙️](/setup)
