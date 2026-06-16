// ============================================================================
// Module 1 — Identifiants & argent  ✅ SOLUTION
// ----------------------------------------------------------------------------
// On "tague" (brand) des types primitifs. Un `TicketId` est un `string` au
// runtime, mais au niveau des types il est INCOMPATIBLE avec `VisitorId` ou un
// `string` nu. Pareil pour `EUR` vs `USD` : on ne peut plus les additionner.
// La seule façon d'en fabriquer un passe par un constructeur explicite.
// ============================================================================

declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };

export type TicketId = Brand<string, "TicketId">;
export type VisitorId = Brand<string, "VisitorId">;

export type EUR = Brand<number, "EUR">;
export type USD = Brand<number, "USD">;

// Constructeurs (la frontière où l'on accepte de "brander").
export const TicketId = (raw: string): TicketId => raw as TicketId;
export const VisitorId = (raw: string): VisitorId => raw as VisitorId;
export const eur = (n: number): EUR => n as EUR;
export const usd = (n: number): USD => n as USD;

export interface Ticket {
  id: TicketId;
  ownerId: VisitorId;
  price: EUR;
}

// On ne peut PLUS appeler refund(visitor.id, ...) : VisitorId != TicketId.
export function refund(ticketId: TicketId, amount: EUR): string {
  if (amount < 0) {
    throw new Error("Le montant ne peut pas être négatif");
  }
  return `Remboursement de ${amount} pour le billet ${ticketId}`;
}

// `total` n'accepte que des EUR : impossible d'y glisser des USD ou un id.
export function total(prices: EUR[]): EUR {
  return prices.reduce((acc, p) => (acc + p) as EUR, eur(0));
}
