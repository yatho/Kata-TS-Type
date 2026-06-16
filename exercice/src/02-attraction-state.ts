// ============================================================================
// Module 2 — État d'une attraction
// ----------------------------------------------------------------------------
// PROBLÈME : un seul objet plat avec des champs optionnels. Une attraction
// "fermée" peut quand même avoir une file d'attente ; une attraction "ouverte"
// peut ne pas avoir de temps d'attente. On colmate avec des `if` et des `!`.
//
// 🎯 OBJECTIF : une union discriminée où chaque état ne porte QUE les données
// qui ont du sens.
// ============================================================================

export type AttractionStatus = "open" | "closed" | "maintenance";

export interface Attraction {
  name: string;
  status: AttractionStatus;
  // valable seulement si open :
  waitTimeMinutes?: number;
  // valable seulement si maintenance :
  reopensAt?: Date;
  // valable seulement si closed :
  closureReason?: string;
}

export function describe(attraction: Attraction): string {
  if (attraction.status === "open") {
    // On DOIT mettre un `!` ou un fallback : le type ne garantit rien.
    return `${attraction.name} est ouverte (attente ${attraction.waitTimeMinutes ?? 0} min)`;
  }
  if (attraction.status === "maintenance") {
    return `${attraction.name} rouvre le ${attraction.reopensAt?.toISOString() ?? "?"}`;
  }
  return `${attraction.name} est fermée : ${attraction.closureReason ?? "raison inconnue"}`;
}
