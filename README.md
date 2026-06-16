# Type-Driven Kata

Thèse du kata : **rendre les états invalides impossibles à représenter**, et
faire porter les garanties par le **compilateur** (compile-time) plutôt que par
des contrôles dispersés au **runtime**.

## Contenu du livrable

```
.
├── exercice/     ← le "AVANT" : code naïf, if/throw/regex/as
├── solution/     ← le "APRÈS" : types qui empêchent les erreurs
└── setup-repo.sh        ← crée un repo git avec 2 branches à partir des 2 dossiers
```

Tu peux utiliser le livrable de deux manières.

### Option A — Un seul repo, deux branches (recommandé, conforme à ta demande)

```bash
bash setup-repo.sh mon-kata
cd mon-kata
npm install
npm run check          # tu es sur la branche `exercice`

# pour voir la correction :
git checkout solution
npm run check

# le diff pédagogique avant/après :
git diff exercice solution -- src/
```

### Option B — Deux dossiers indépendants

Ouvre simplement `exercice/` ou `solution/` comme deux projets
séparés (`npm install && npm run check` dans chacun).

## Comment on valide la progression

Les deux modes sont combinés, comme demandé :

- **Tests Vitest** (`npm test`) : le comportement observable est identique entre
  les deux branches ; après refactor, les tests restent verts.
- **Erreurs de compilation** (`npm run typecheck`) : sur la branche `solution`,
  des lignes commentées montrent ce que `tsc` refuse désormais ; le fichier
  `exercice/EXERCICES.md` liste les "checkpoints" de compilation à
  atteindre, module par module.

## Pédagogie : les 6 techniques

1. **Branded types** — distinguer `TicketId`/`VisitorId` et `EUR`/`USD`.
2. **Unions discriminées** — chaque état ne porte que ses données propres.
3. **Exhaustivité** (`assertNever`) — ajouter un cas casse la compilation.
4. **Template literal types** — codes de zone `"A-12"` validés au type.
5. **Illegal states unrepresentable** — `Wristband` en union, `NonEmptyArray`.
6. **Type predicates** — une seule frontière `unknown → Ticket`, sûre.

## Pré-requis

Node 18+ et npm. TypeScript et Vitest sont installés via `npm install`. La
config `tsconfig.json` est volontairement stricte (`strict`,
`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.) : la rigueur
fait partie du kata.
