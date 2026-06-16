// ============================================================================
// Module 3 — Exhaustivité  ✅ SOLUTION
// ----------------------------------------------------------------------------
// On supprime le `default` et on le remplace par `assertNever`. Si quelqu'un
// ajoute "platinum" à `PassKind`, le cas non traité fait que `kind` n'est plus
// de type `never` dans la branche par défaut -> ERREUR DE COMPILATION.
// Le filet de sécurité est désormais le compilateur, pas un retour à 0.
// ============================================================================

export type PassKind = "single" | "day" | "season";

function assertNever(value: never): never {
  throw new Error(`Cas non géré : ${JSON.stringify(value)}`);
}

export function priceFor(kind: PassKind): number {
  switch (kind) {
    case "single":
      return 25;
    case "day":
      return 60;
    case "season":
      return 300;
    default:
      // Décommentez "platinum" dans PassKind : cette ligne ne compilera plus.
      return assertNever(kind);
  }
}
