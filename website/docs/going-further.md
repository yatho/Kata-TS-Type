---
id: going-further
title: Aller plus loin
---

# 🚀 Aller plus loin

Vous avez terminé les 6 modules. Voici ce que vous pouvez explorer ensuite.

## Librairies qui vont plus loin

### Validation à la frontière
- **[Zod](https://zod.dev)** — schemas TypeScript-first qui génèrent des types ET valident au runtime
- **[Valibot](https://valibot.dev)** — alternative plus légère à Zod (tree-shakable)
- **[arktype](https://arktype.io)** — validation avec une syntaxe proche des types TypeScript

Ces librairies automatisent ce que vous avez fait manuellement dans le Module 6.

### Types utilitaires
- **[ts-essentials](https://github.com/ts-essentials/ts-essentials)** — inclut `UnreachableCaseError` (votre `assertNever`), `NonEmptyArray`, et bien d'autres
- **[type-fest](https://github.com/sindresorhus/type-fest)** — collection de types utilitaires dont `Branded`

## Concepts connexes

### Opaque types vs Branded types
Les branded types de ce kata utilisent un symbol unique. Une alternative : les **opaque types** via des classes privées ou des modules. Chaque approche a ses compromis.

### Result types
Le Module 6 lance une exception en cas d'échec. Une alternative fonctionnelle : un type `Result<T, E>` :

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function parseTicket(input: unknown): Result<Ticket, string> { ... }
```

Librairies : [neverthrow](https://github.com/supermacro/neverthrow), [oxide.ts](https://github.com/traverse1984/oxide.ts).

### Data-Oriented Design
Ce kata est inspiré de **[crazy-data-oriented-programming](https://github.com/jtama/crazy-data-oriented-programming)** en Java (records scellés, switch expressions). Les mêmes idées émergent indépendamment en Elm, Haskell, Rust, F# — et de plus en plus en TypeScript.

## Lectures

- **[Parse, Don't Validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)** — Alexis King (2019) — l'article qui formule le principe du Module 6
- **[Making Impossible States Impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8)** — Richard Feldman, Elm Europe 2016 — le titre de ce kata vient de là
- **[TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)** — la référence officielle sur les unions discriminées

## Défis bonus

Si vous avez terminé en avance :

1. **Zod** — réécrivez `parseTicket` (Module 6) avec Zod. Constatez ce que vous n'avez plus à écrire.
2. **Result** — refactorez `parseTicket` pour retourner `Result<Ticket, string>` au lieu de lancer une exception.
3. **Tests de compilation** — écrivez les tests `@ts-expect-error` documentés dans `EXERCICES.md` pour chaque module.
4. **Extension** — ajoutez un module 7 : un `ParkMap` qui mappe des `ZoneCode` à des `Attraction[]`, avec des garanties de type sur les clés.
