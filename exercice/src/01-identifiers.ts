// ============================================================================
// Module 1 — Identifiants & argent
// ----------------------------------------------------------------------------
// PROBLÈME : tout est `string` ou `number`. Rien n'empêche de passer un id de
// visiteur là où on attend un id de billet, ni d'additionner des euros et des
// dollars. Les erreurs ne se voient qu'au runtime (ou pas du tout).
//
// 🎯 OBJECTIF (voir branche `solution`) : introduire des *branded types* pour
// que le compilateur refuse ces confusions.
// ============================================================================

export type TicketId = string;
export type VisitorId = string;
export type Amount = number; // en quelle devise ? mystère...

export interface Ticket {
  id: TicketId;
  ownerId: VisitorId;
  price: Amount;
}

// Rien n'empêche d'appeler refund(visitor.id, ...) par erreur.
export function refund(ticketId: TicketId, amount: Amount): string {
  if (amount < 0) {
    throw new Error("Le montant ne peut pas être négatif"); // contrôle runtime
  }
  return `Remboursement de ${amount} pour le billet ${ticketId}`;
}

// On peut additionner n'importe quoi : euros + dollars, prix + id parsé...
export function total(prices: Amount[]): Amount {
  return prices.reduce((acc, p) => acc + p, 0);
}
