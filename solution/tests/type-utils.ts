// Outils d'assertion au niveau des TYPES (vérifiés par `tsc`, pas par Vitest).
// Si une égalité de type est fausse, la compilation échoue.

export type Expect<T extends true> = T;

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? true
    : false;
