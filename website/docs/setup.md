---
id: setup
title: Installation
---

# ⚙️ Installation

## Prérequis

- **Node.js** 18 ou supérieur
- **npm** (inclus avec Node.js)

Vérifiez :

```bash
node --version  # >= 18.0.0
npm --version
```

## Option A — Repo Git avec deux branches (recommandé)

Le script `setup-repo.sh` crée un repo avec une branche `exercice` (le code naïf) et une branche `solution` (le refactor complet).

```bash
# Récupérez le kata
git clone https://github.com/your-org/type-driven-theme-park-kata.git
cd type-driven-theme-park-kata

# Créez le repo de travail
bash setup-repo.sh mon-kata
cd mon-kata
npm install
```

Vous êtes sur la branche `exercice`. Vérifiez que tout fonctionne :

```bash
npm test          # ✅ Les tests passent
npm run typecheck # ✅ Pas d'erreur (encore)
```

### Naviguer entre les branches

```bash
# Voir la solution d'un module
git checkout solution -- src/01-identifiers.ts

# Voir le diff pédagogique complet
git diff exercice solution -- src/

# Revenir à l'exercice
git checkout exercice -- src/01-identifiers.ts
```

## Option B — Deux dossiers indépendants

Si vous ne voulez pas de Git, travaillez directement dans `branch-exercice/` :

```bash
cd branch-exercice
npm install
npm test          # ✅
npm run typecheck # ✅
```

La correction est dans `branch-solution/`.

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm test` | Lance Vitest — le comportement doit rester identique |
| `npm run typecheck` | Lance `tsc --noEmit` — votre feedback principal |
| `npm run check` | Les deux ensemble |

:::info Le cycle de travail
Pour chaque module : modifiez `src/0X-*.ts` → `npm run typecheck` → si les erreurs attendues apparaissent (ou disparaissent) → `npm test` pour vérifier qu'on n'a rien cassé.
:::

---

Tout est prêt ? → [Module 1 — Branded Types 🏷️](/modules/01-branded-types)
