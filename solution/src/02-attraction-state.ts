// ============================================================================
// Module 2 — État d'une attraction  ✅ SOLUTION
// ----------------------------------------------------------------------------
// Une UNION DISCRIMINÉE : chaque variante porte uniquement les champs qui ont
// du sens pour cet état. Une attraction `closed` n'a pas de `waitTimeMinutes`,
// et le compilateur le sait. Dans `describe`, l'accès aux champs est garanti :
// plus aucun `?` ni `!`.
// ============================================================================

interface Open {
  readonly status: "open";
  readonly name: string;
  readonly waitTimeMinutes: number;
}

interface Closed {
  readonly status: "closed";
  readonly name: string;
  readonly closureReason: string;
}

interface Maintenance {
  readonly status: "maintenance";
  readonly name: string;
  readonly reopensAt: Date;
}

export type Attraction = Open | Closed | Maintenance;

export function describe(attraction: Attraction): string {
  switch (attraction.status) {
    case "open":
      // waitTimeMinutes est garanti présent ici.
      return `${attraction.name} est ouverte (attente ${attraction.waitTimeMinutes} min)`;
    case "maintenance":
      return `${attraction.name} rouvre le ${attraction.reopensAt.toISOString()}`;
    case "closed":
      return `${attraction.name} est fermée : ${attraction.closureReason}`;
  }
}
