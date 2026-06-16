// ============================================================================
// Module 5 — États illégaux non représentables
// ----------------------------------------------------------------------------
// PROBLÈME deux cas classiques :
//  (a) un visiteur a un bracelet OU pas ; ici on a un booléen + un champ
//      optionnel qui peuvent être incohérents (hasWristband=true mais
//      wristbandId=undefined).
//  (b) un panier de billets ne devrait jamais être vide au paiement, mais
//      `Ticket[]` autorise `[]`. On le vérifie au runtime.
//
// 🎯 OBJECTIF : modéliser le bracelet par une union, et le panier par un
// NonEmptyArray pour rendre `[]` impossible à passer.
// ============================================================================

import type { Ticket } from "./01-identifiers.js";

export interface Visitor {
  name: string;
  hasWristband: boolean;
  wristbandId?: string; // censé exister ssi hasWristband === true
}

export function entryBadge(visitor: Visitor): string {
  if (visitor.hasWristband) {
    // Incohérence possible : on doit gérer le undefined "impossible".
    return `Bracelet n°${visitor.wristbandId ?? "??? (état incohérent)"}`;
  }
  return `${visitor.name} : billet à scanner`;
}

export function checkout(cart: Ticket[]): number {
  if (cart.length === 0) {
    throw new Error("Le panier est vide"); // runtime only
  }
  return cart.reduce((acc, t) => acc + t.price, 0);
}
