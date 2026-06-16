// ============================================================================
// Module 6 — La frontière runtime → compilation  ✅ SOLUTION
// ----------------------------------------------------------------------------
// On ne ment plus au compilateur. `isTicket` est un TYPE PREDICATE qui inspecte
// réellement la donnée `unknown`. Après ce contrôle (fait une seule fois, à la
// frontière), le type `Ticket` est garanti pour tout le reste du programme.
// ============================================================================

import type { Ticket } from "./01-identifiers.js";
import { TicketId, VisitorId, eur } from "./01-identifiers.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isTicket(value: unknown): value is Ticket {
  return (
    isRecord(value) &&
    typeof value["id"] === "string" &&
    typeof value["ownerId"] === "string" &&
    typeof value["price"] === "number"
  );
}

// Renvoie un Ticket VALIDE ou lève une erreur explicite, au bon endroit.
export function parseTicket(input: unknown): Ticket {
  if (!isTicket(input)) {
    throw new Error("Billet malformé");
  }
  // On reconstruit avec les branded types pour repartir proprement.
  return {
    id: TicketId(input.id),
    ownerId: VisitorId(input.ownerId),
    price: eur(input.price),
  };
}

export function priceOfFirst(rawTickets: unknown[]): number {
  const first = parseTicket(rawTickets[0]);
  return first.price; // sûr : la forme a été vérifiée
}
