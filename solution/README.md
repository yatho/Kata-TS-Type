# Type-Driven Kata — branche `solution`

Correction du kata. Chaque module de `src/` applique une technique pour rendre
un état invalide **impossible à représenter**, en s'appuyant sur le compilateur
plutôt que sur des contrôles au runtime.

```bash
npm install
npm run check
```

## Ce qui change par rapport à `exercice`

| # | Technique | Avant (exercice) | Après (solution) |
|---|-----------|------------------|------------------|
| 1 | **Branded types** | `string` / `number` partout | `TicketId`, `VisitorId`, `EUR`, `USD` incompatibles entre eux |
| 2 | **Union discriminée** | objet plat à champs optionnels | `Open \| Closed \| Maintenance`, chaque variante porte ses seules données |
| 3 | **Exhaustivité** | `default: return 0` | `assertNever(kind)` — ajouter un cas casse `tsc` |
| 4 | **Template literal types** | `string` + regex runtime | `` `${Sector}-${Digit}${Digit}` `` + `isZoneCode` |
| 5 | **Illegal states unrepresentable** | booléen + champ optionnel ; `Ticket[]` | union `Wristband` ; `NonEmptyArray<Ticket>` |
| 6 | **Type predicate** | `input as Ticket` | `isTicket(x): x is Ticket` à la frontière |

## Idée directrice

Le runtime ne valide qu'**une seule fois**, à la frontière (module 6). Une fois
la donnée "brandée" et raffinée, tout le reste du code manipule des types qui ne
peuvent plus être faux — donc plus de gardes défensives disséminées partout.

Voir le diff pédagogique :

```bash
git diff exercice solution -- src/
```
