// ============================================================================
// Module 4 — Codes de zone  ✅ SOLUTION
// ----------------------------------------------------------------------------
// Un TEMPLATE LITERAL TYPE décrit la forme exacte d'un code valide. Les
// littéraux conformes sont acceptés à la compilation ; les autres sont
// refusés. Pour les `string` dynamiques, un type predicate fait la validation
// une seule fois et "raffine" le type.
// ============================================================================

type Sector = "A" | "B" | "C" | "D" | "E";
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type ZoneCode = `${Sector}-${Digit}${Digit}`;

const ZONE_PATTERN = /^[A-E]-\d{2}$/;

export function isZoneCode(value: string): value is ZoneCode {
  return ZONE_PATTERN.test(value);
}

export function locate(code: ZoneCode): string {
  // Plus besoin de revalider : le type GARANTIT la forme.
  const sector = code[0];
  return `Secteur ${sector}, emplacement ${code}`;
}

// ✅ Un littéral conforme compile :
export const ok: ZoneCode = "A-12";

// ❌ Décommentez : "Type '\"pas un code\"' is not assignable to type ZoneCode".
// export const broken: ZoneCode = "pas un code";
