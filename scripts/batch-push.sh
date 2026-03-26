#!/bin/bash
# Batch push all consults to Supabase
cd "$(dirname "$0")/.."

consults=(
  sepsis meningitis anaphylaxis status-epilepticus dka pe-treatment
  chf-exacerbation stroke afib-rvr ich sah stemi nstemi
  opioid-withdrawal alcohol-withdrawal tca-toxidrome acetaminophen
  salicylate anticoag-reversal pep hiv rabies syphilis neurosyphilis
  tuberculosis potassium sodium thyroid adrenal-insufficiency angioedema
  delirium combative-patient burns snake-envenomation migraine hemophilia
  sickle-cell priapism croup uti-peds peds-fever neonatal-resus
  precip-delivery shoulder-dystocia aub first-trimester diarrhea
  aacg chemical-burn orbital-cellulitis crao globe-rupture chest-tube
  distal-radius
)

echo "Pushing ${#consults[@]} consults to Supabase..."
success=0
failed=0

for c in "${consults[@]}"; do
  echo -n "  $c... "
  output=$(node scripts/supabase-push.mjs "$c" --update 2>&1)
  if echo "$output" | grep -q "Done!"; then
    echo "✓"
    ((success++))
  else
    echo "✗"
    echo "$output" | grep -E "(ERROR|error)" | head -1
    ((failed++))
  fi
done

echo ""
echo "Complete: $success succeeded, $failed failed"
