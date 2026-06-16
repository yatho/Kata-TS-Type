// ============================================================================
// Module 4 — Codes de zone
// ----------------------------------------------------------------------------
// PROBLÈME : un code de zone est censé avoir la forme "A-12" (une lettre de
// secteur, un tiret, deux chiffres). Mais c'est juste un `string`. On valide
// au runtime avec une regex, et on peut oublier de le faire.
//
// 🎯 OBJECTIF : un *template literal type* qui décrit la forme valide, plus un
// parseur unique à la frontière.
// ============================================================================

export type ZoneCode = string; // "A-12", "B-07", ... ou n'importe quoi

const ZONE_PATTERN = /^[A-E]-\d{2}$/;

export function locate(code: ZoneCode): string {
  if (!ZONE_PATTERN.test(code)) {
    throw new Error(`Code de zone invalide : ${code}`); // runtime only
  }
  const sector = code[0];
  return `Secteur ${sector}, emplacement ${code}`;
}

// Rien n'empêche ceci de compiler :
export const broken: ZoneCode = "pas un code";
