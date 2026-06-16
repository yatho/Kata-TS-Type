// ============================================================================
// Module 3 — Exhaustivité
// ----------------------------------------------------------------------------
// PROBLÈME : ce `switch` a un `default` qui avale silencieusement tout nouveau
// cas. Si on ajoute un type de pass "platinum", la fonction renverra le prix
// par défaut sans qu'aucune erreur ne soit levée à la compilation.
//
// 🎯 OBJECTIF : retirer le `default` et utiliser `assertNever` pour que toute
// extension de l'union casse la compilation tant qu'elle n'est pas traitée.
// ============================================================================

export type PassKind = "single" | "day" | "season";
// 👀 Essayez d'ajouter "platinum" ici, puis observez : rien ne casse.

export function priceFor(kind: PassKind): number {
  switch (kind) {
    case "single":
      return 25;
    case "day":
      return 60;
    case "season":
      return 300;
    default:
      // Filet de sécurité runtime qui masque le vrai problème.
      return 0;
  }
}
