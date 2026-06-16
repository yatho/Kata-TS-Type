# Exercices — checklist détaillée

Pour chaque module, après ton refactor, **les deux conditions** doivent être
vraies :
- ✅ `npm test` passe toujours (comportement inchangé),
- ✅ les "tests de compilation" ci-dessous se comportent comme indiqué.

Un "test de compilation" se fait en décommentant une ligne et en lançant
`npm run typecheck`. `// @ts-expect-error` est ton ami : si tu le mets devant une
ligne et qu'elle compile quand même, `tsc` te le signalera.

---

## Module 1 — Branded types

Objectif : `TicketId ≠ VisitorId` et `EUR ≠ USD` au niveau des types.

Après refactor, ceci doit **échouer** à la compilation (ajoute-le dans un
fichier scratch ou un test) :

```ts
const v: VisitorId = VisitorId("V-1");
refund(v, eur(10)); // ❌ VisitorId n'est pas un TicketId

const prix: EUR[] = [eur(10), usd(5)]; // ❌ USD dans un EUR[]
```

## Module 2 — Union discriminée

Objectif : une attraction `closed` ne doit pas pouvoir porter de
`waitTimeMinutes`.

Ceci doit **échouer** :

```ts
const a: Attraction = {
  status: "closed",
  name: "X",
  waitTimeMinutes: 10, // ❌ ce champ n'existe pas sur la variante closed
};
```

Et dans `describe`, plus aucun `?.` ni `??` ne doit être nécessaire.

## Module 3 — Exhaustivité

Objectif : retirer le `default: return 0` et le remplacer par `assertNever`.

Test : ajoute `"platinum"` à `PassKind`. La compilation doit **casser** sur
`priceFor` tant que tu ne traites pas le nouveau cas. (Puis retire `"platinum"`.)

## Module 4 — Template literal types

Objectif : `ZoneCode` décrit la forme `"A-12"`.

Ceci doit **échouer** :

```ts
const z: ZoneCode = "pas un code"; // ❌
```

Et `locate` ne doit plus appeler la regex (le type garantit déjà la forme). Pour
les `string` dynamiques venant de l'extérieur, expose un `isZoneCode`.

## Module 5 — États illégaux

Objectif (a) : le bracelet devient une union ; l'état
`hasWristband: true` + `wristbandId: undefined` ne doit plus exister.

Objectif (b) : `checkout` prend un `NonEmptyArray<Ticket>`.

Ceci doit **échouer** :

```ts
checkout([]); // ❌ un tableau vide n'est pas un NonEmptyArray
```

## Module 6 — Frontière de parsing

Objectif : remplacer le `as Ticket` par un type predicate `isTicket`.

Après refactor, ce test (déjà présent sur la branche solution) doit passer :

```ts
expect(() => parseTicket({ id: "T-1" })).toThrow();
```

---

Quand les 6 modules sont faits, compare avec la branche `solution` :

```bash
git diff exercice solution -- src/
```
