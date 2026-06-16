#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Crée un dépôt git avec deux branches : `exercice` (le "avant") et `solution`
# (le "après"). À lancer depuis le dossier qui contient `branch-exercice/` et
# `branch-solution/`.
#
#   bash setup-repo.sh mon-kata
#
# Résultat : un dossier `mon-kata/` initialisé, branche par défaut = exercice.
# ---------------------------------------------------------------------------
set -euo pipefail

TARGET="${1:-mon-kata}"

if [[ -e "$TARGET" ]]; then
  echo "❌ '$TARGET' existe déjà. Choisis un autre nom." >&2
  exit 1
fi

mkdir "$TARGET"
cd "$TARGET"
git init -q
git symbolic-ref HEAD refs/heads/exercice

# --- Branche exercice -------------------------------------------------------
cp -R ../exercice/. .
git add -A
git commit -q -m "exercice: code naïf, contrôles au runtime"

# --- Branche solution -------------------------------------------------------
git checkout -q -b solution
# on remplace src/ et tests/ par la version corrigée, on garde la config
rm -rf src tests README.md EXERCICES.md
cp -R ../solution/. .
git add -A
git commit -q -m "solution: états invalides rendus impossibles à la compilation"

# --- On revient sur exercice par défaut -------------------------------------
git checkout -q exercice

echo "✅ Dépôt prêt dans '$TARGET/'"
echo "   Branches : exercice (défaut), solution"
echo "   Diff pédagogique : git -C '$TARGET' diff exercice solution -- src/"
