# Identifying & Fixing Code Smells — Aayush Kumar Singh

## Magic Numbers & Strings
Before:
```javascript
if (order.status === 1) { ... }
if (total > 100) { ... }
```
After:
```javascript
const ORDER_STATUS_CONFIRMED = 1;
const BULK_DISCOUNT_THRESHOLD = 100;

if (order.status === ORDER_STATUS_CONFIRMED) { ... }
if (total > BULK_DISCOUNT_THRESHOLD) { ... }
```
Hardcoded values like `1` or `100` give no clue what they represent. Naming them turns an unexplained number into self-documenting code.

## Long Functions
Before: a single function that filtered orders, summed totals, applied a discount, and formatted the result all in one block.
After: split into `getConfirmedOrders`, `sumOrderTotal`, `applyBulkDiscountIfEligible`, and a small function that composes them (see `clean_code.md` for the full refactor). Each piece now has one clear responsibility.

## Duplicate Code
Before: the same discount calculation copy-pasted in two different screens.
After: extracted into a single shared `applyBulkDiscountIfEligible` function imported by both, so the rule only needs to be correct in one place.

## Large Classes (God Objects)
Example smell: a single `OrderManager` class handling order calculation, API calls, UI state, and notification logic all at once.
Fix: split responsibilities into separate, focused modules, an `orderCalculations.js` for pure math, an `orderApi.js` for network calls, and keep UI state management inside the component itself, so no single file is responsible for everything.

## Deeply Nested Conditionals
Before:
```javascript
function processOrder(order) {
  if (order) {
    if (order.status === ORDER_STATUS_CONFIRMED) {
      if (order.price > 0) {
        return order.price * order.quantity;
      }
    }
  }
  return 0;
}
```
After, using guard clauses:
```javascript
function processOrder(order) {
  if (!order) return 0;
  if (order.status !== ORDER_STATUS_CONFIRMED) return 0;
  if (order.price <= 0) return 0;
  return order.price * order.quantity;
}
```
Flattening nested conditionals into early returns makes the valid path much easier to follow, since you no longer have to mentally track several layers of indentation to find the actual logic.

## Commented-Out Code
Example smell: old, disabled blocks of code left in a file "just in case," like an old version of a function commented out above the current one.
Fix: deleted it entirely. Git history already preserves old versions if they're ever needed again, so dead commented-out code just adds clutter and makes readers wonder if it's still relevant.

## Inconsistent Naming
Before: a file mixing `getUsr`, `fetch_order`, and `CalculateTotal` in the same codebase, three different casing and abbreviation styles.
After: standardized to camelCase, full words, verb-first function names throughout: `getUser`, `fetchOrder`, `calculateTotal`.

## Reflection

### What code smells did you find in your code?
Looking back at earlier, less structured versions of my own project code (particularly early Bitezy work), I found long functions mixing multiple responsibilities, a few magic numbers with no explanation, and inconsistent naming conventions across files written at different times.

### How did refactoring improve the readability and maintainability of the code?
Breaking things into small, named, single-purpose functions made the code much easier to scan and modify without fear of breaking something unrelated. Naming constants and functions clearly also meant I could understand old code of my own months later without having to re-trace the original logic from scratch.

### How can avoiding code smells make future debugging easier?
Clean, small, consistently named functions make it much faster to isolate where a bug actually lives, since each function has a narrow, well-defined job. A tangled function doing five things at once forces you to mentally untangle all five possibilities before you can even start debugging.
