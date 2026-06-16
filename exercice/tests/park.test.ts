import { describe, it, expect } from "vitest";

import { refund, total, type Ticket } from "../src/01-identifiers.js";
import { describe as describeAttraction } from "../src/02-attraction-state.js";
import { priceFor } from "../src/03-exhaustiveness.js";
import { locate } from "../src/04-zone-codes.js";
import { entryBadge, checkout } from "../src/05-illegal-states.js";
import { parseTicket } from "../src/06-parsing-boundary.js";

describe("Module 1 — identifiants & argent", () => {
  it("rembourse un montant valide", () => {
    expect(refund("T-1", 25)).toContain("T-1");
  });

  it("refuse un montant négatif", () => {
    expect(() => refund("T-1", -5)).toThrow();
  });

  it("additionne des prix", () => {
    expect(total([10, 15, 5])).toBe(30);
  });
});

describe("Module 2 — état d'une attraction", () => {
  it("décrit une attraction ouverte avec son temps d'attente", () => {
    const out = describeAttraction({
      name: "Space Loop",
      status: "open",
      waitTimeMinutes: 45,
    });
    expect(out).toContain("45");
  });

  it("décrit une attraction fermée avec sa raison", () => {
    const out = describeAttraction({
      name: "River Rapids",
      status: "closed",
      closureReason: "météo",
    });
    expect(out).toContain("météo");
  });
});

describe("Module 3 — exhaustivité", () => {
  it("calcule le prix de chaque pass connu", () => {
    expect(priceFor("single")).toBe(25);
    expect(priceFor("day")).toBe(60);
    expect(priceFor("season")).toBe(300);
  });
});

describe("Module 4 — codes de zone", () => {
  it("localise un code valide", () => {
    expect(locate("A-12")).toContain("A-12");
  });

  it("rejette un code invalide", () => {
    expect(() => locate("nope")).toThrow();
  });
});

describe("Module 5 — états illégaux", () => {
  it("affiche le bracelet d'un visiteur qui en a un", () => {
    expect(
      entryBadge({ name: "Mei", hasWristband: true, wristbandId: "W-9" }),
    ).toContain("W-9");
  });

  it("calcule le total d'un panier non vide", () => {
    const cart: Ticket[] = [
      { id: "T-1", ownerId: "V-1", price: 25 },
      { id: "T-2", ownerId: "V-1", price: 60 },
    ];
    expect(checkout(cart)).toBe(85);
  });
});

describe("Module 6 — frontière de parsing", () => {
  it("parse un billet bien formé", () => {
    const t = parseTicket({ id: "T-1", ownerId: "V-1", price: 25 });
    expect(t.price).toBe(25);
  });

  // Dans la branche `solution`, ce test doit aussi REJETER une donnée malformée.
  // Dans la branche `exercice`, parseTicket ment et ce comportement n'existe pas.
});
