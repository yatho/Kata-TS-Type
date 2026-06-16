// ============================================================================
// Module 6 — La frontière runtime → compilation
// ----------------------------------------------------------------------------
// PROBLÈME : les données arrivent du monde extérieur en `unknown` (JSON d'une
// API, body d'une requête...). Ici on fait un `as` direct : on ment au
// compilateur. Si la donnée est malformée, tout casse plus loin, loin de la
// cause.
//
// 🎯 OBJECTIF : un *type predicate* (`x is Ticket`) qui valide réellement la
// donnée une seule fois, à l'entrée, et garantit le type ensuite.
// ============================================================================

import type { Ticket } from "./01-identifiers.js";

export function parseTicket(input: unknown): Ticket {
  // ❌ On affirme le type sans rien vérifier.
  return input as Ticket;
}

export function priceOfFirst(rawTickets: unknown[]): number {
  const first = parseTicket(rawTickets[0]);
  return first.price; // peut exploser au runtime si la forme est mauvaise
}
