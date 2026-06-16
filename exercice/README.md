# Type-Driven Kata — branche `exercice`

Un kata TypeScript pour pratiquer le typage qui rend les **états invalides
impossibles à représenter**, inspiré de
[`jtama/crazy-data-oriented-programming`](https://github.com/jtama/crazy-data-oriented-programming)
(version Java).

Vous êtes sur la branche **exercice** : le code est volontairement naïf. Tout
est typé avec des primitives (`string`, `number`, `boolean`) et la validité
repose sur des contrôles **au runtime** (`if`/`throw`, regex, casts `as`). Votre
mission : déplacer ces garanties **à la compilation**.

## Installation

```bash
npm install
npm run check   # = typecheck + tests
```

Au départ, tout compile et tous les tests passent. C'est justement le problème :
le code accepte des choses qu'il ne devrait pas.

## Règle du jeu

Pour chaque module dans `src/`, un commentaire `🎯 OBJECTIF` décrit la technique
à appliquer. Travaillez module par module. Vous validez votre progression de
**deux façons combinées** :

1. **Erreurs de compilation à faire apparaître puis disparaître.** Chaque module
   contient (ou vous demandera d'ajouter) des lignes qui *devraient* être
   rejetées par `tsc`. Voir `EXERCICES.md`.
2. **Tests Vitest à garder verts.** Le comportement observable ne doit pas
   changer : `npm test` doit continuer de passer après votre refactor.

> 💡 L'objectif n'est PAS d'écrire plus de code de validation, mais d'en écrire
> **moins** en laissant le compilateur faire le travail.

## Les 6 modules

| # | Fichier | Technique cible |
|---|---------|-----------------|
| 1 | `01-identifiers.ts` | Branded types (`TicketId`, `EUR`) |
| 2 | `02-attraction-state.ts` | Union discriminée |
| 3 | `03-exhaustiveness.ts` | `assertNever` / exhaustivité |
| 4 | `04-zone-codes.ts` | Template literal types |
| 5 | `05-illegal-states.ts` | Union + `NonEmptyArray` |
| 6 | `06-parsing-boundary.ts` | Type predicate (`x is Ticket`) |

La correction complète est sur la branche **`solution`**.
