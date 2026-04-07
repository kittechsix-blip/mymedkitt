#!/bin/bash
# Critical Actions Feature Audit Script
# Checks: (1) tree file has CRITICAL_ACTIONS export, (2) loader includes criticalActions, (3) names match

echo "=== CRITICAL ACTIONS AUDIT ==="
echo ""

TREE_DIR="src/data/trees"
SERVICE_FILE="src/services/tree-service.ts"

total_files=0
has_export=0
has_loader=0
loader_includes_critical=0
mismatches=0

declare -a missing_loader_critical=()
declare -a name_mismatches=()
declare -a all_good=()

# Get all tree files (excluding index.ts)
for tree_file in $TREE_DIR/*.ts; do
  [[ $(basename "$tree_file") == "index.ts" ]] && continue

  total_files=$((total_files + 1))

  filename=$(basename "$tree_file" .ts)

  # Check if tree file has CRITICAL_ACTIONS export
  export_name=$(grep -o "export const [A-Z_]*CRITICAL_ACTIONS" "$tree_file" | head -1 | awk '{print $3}')

  if [[ -n "$export_name" ]]; then
    has_export=$((has_export + 1))

    # Check if tree-service.ts has a loader for this file
    if grep -q "'$filename'" "$SERVICE_FILE"; then
      has_loader=$((has_loader + 1))

      # Extract the loader line for this tree
      loader_line=$(grep -A 2 "'$filename'" "$SERVICE_FILE" | grep "criticalActions:")

      if [[ -n "$loader_line" ]]; then
        loader_includes_critical=$((loader_includes_critical + 1))

        # Extract the criticalActions import name from loader
        loader_import=$(echo "$loader_line" | grep -o "m\.[A-Z_]*CRITICAL_ACTIONS" | cut -d. -f2)

        # Check if names match
        if [[ "$export_name" == "$loader_import" ]]; then
          all_good+=("$filename")
        else
          name_mismatches+=("$filename: export=$export_name, loader=$loader_import")
          mismatches=$((mismatches + 1))
        fi
      else
        missing_loader_critical+=("$filename (has export: $export_name)")
      fi
    else
      echo "⚠️  WARNING: $filename has CRITICAL_ACTIONS but no loader in tree-service.ts"
    fi
  else
    echo "❌ MISSING EXPORT: $filename has no CRITICAL_ACTIONS export"
  fi
done

echo ""
echo "=== SUMMARY ==="
echo "Total tree files: $total_files"
echo "Files with CRITICAL_ACTIONS export: $has_export"
echo "Files with loader in tree-service.ts: $has_loader"
echo "Loaders that include criticalActions: $loader_includes_critical"
echo "Name mismatches: $mismatches"
echo ""

if [[ ${#missing_loader_critical[@]} -gt 0 ]]; then
  echo "=== FILES MISSING criticalActions IN LOADER ==="
  for item in "${missing_loader_critical[@]}"; do
    echo "  ❌ $item"
  done
  echo ""
fi

if [[ ${#name_mismatches[@]} -gt 0 ]]; then
  echo "=== NAME MISMATCHES ==="
  for item in "${name_mismatches[@]}"; do
    echo "  🔴 $item"
  done
  echo ""
fi

echo "=== FILES WITH WORKING CRITICAL ACTIONS ($((${#all_good[@]})) total) ==="
echo "(Export + Loader both correct)"
echo ""

# Show sample of working ones
if [[ ${#all_good[@]} -gt 0 ]]; then
  echo "First 10:"
  for i in {0..9}; do
    [[ $i -lt ${#all_good[@]} ]] && echo "  ✅ ${all_good[$i]}"
  done
  echo ""
fi
