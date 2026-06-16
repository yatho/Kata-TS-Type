// ============================================================================
// Module 5 — États illégaux non représentables  ✅ SOLUTION
// ----------------------------------------------------------------------------
// (a) Le bracelet devient une UNION : soit on en a un (avec son id), soit pas.
//     L'état "hasWristband=true mais wristbandId=undefined" n'existe plus.
// (b) Le panier devient un NonEmptyArray : le type exige au moins un élément,
//     donc `[]` ne compile pas. Plus besoin de vérifier la longueur.
// ============================================================================

import type { Ticket, EUR } from "./01-identifiers.js";
import { eur } from "./01-identifiers.js";

type Wristband =
  | { readonly kind: "none" }
  | { readonly kind: "issued"; readonly id: string };

export interface Visitor {
  readonly name: string;
  readonly wristband: Wristband;
}

export function entryBadge(visitor: Visitor): string {
  if (visitor.wristband.kind === "issued") {
    // id garanti présent : aucun état incohérent possible.
    return `Bracelet n°${visitor.wristband.id}`;
  }
  return `${visitor.name} : billet à scanner`;
}

// Un tableau qui a TOUJOURS au moins un élément.
export type NonEmptyArray<T> = readonly [T, ...T[]];

export function checkout(cart: NonEmptyArray<Ticket>): EUR {
  // cart[0] existe forcément ; pas de garde runtime nécessaire.
  return cart.reduce<EUR>((acc, t) => (acc + t.price) as EUR, eur(0));
}
