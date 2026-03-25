#!/bin/bash
# Calculator validation script
# Checks for common calculator bugs before deployment

echo "🔍 Running calculator validation..."
echo ""

# Check 1: Toggle points = 0
echo "1. Checking for toggle fields with points: 0..."
TOGGLE_ZERO=$(grep -n "type: 'toggle'" src/components/calculator.ts | grep "points: 0")
if [ -z "$TOGGLE_ZERO" ]; then
  echo "   ✅ No toggles with points: 0 found"
else
  echo "   ❌ FOUND toggles with points: 0:"
  echo "$TOGGLE_ZERO"
  echo ""
  echo "   FIX: Change 'points: 0' to 'points: 1' for all toggles"
  exit 1
fi
echo ""

# Check 2: TypeScript compilation
echo "2. Checking TypeScript compilation..."
if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
  echo "   ❌ TypeScript compilation failed"
  npx tsc --noEmit
  exit 1
else
  echo "   ✅ TypeScript compiles successfully"
fi
echo ""

# Check 3: Calculator registration
echo "3. Checking calculator registration..."
CALC_IDS=$(grep "id: '" src/components/calculator.ts | sed "s/.*id: '\([^']*\)'.*/\1/" | tail -5)
echo "   Recent calculator IDs:"
for id in $CALC_IDS; do
  if grep -q "'$id':" src/components/calculator.ts | grep "CALCULATORS"; then
    echo "   ✅ $id is registered"
  else
    echo "   ⚠️  $id might not be registered (check manually)"
  fi
done
echo ""

echo "✅ Validation complete!"
echo ""
echo "Next steps:"
echo "1. Manually trace 3+ test cases"
echo "2. Bump SW cache: sed -i '' 's/medkitt-vXXX/medkitt-vYYY/' docs/sw.js"
echo "3. Commit and push"
