# Clean Code — Aayush Kumar Singh

## 1. Understanding Clean Code Principles

### Simplicity
Code should do what it needs to do in the most straightforward way possible. Adding extra abstraction, configuration, or cleverness that isn't actually needed yet just makes the code harder to follow for no real benefit.

### Readability
Code is read far more often than it's written. A function that's slightly longer to type but immediately understandable beats a clever one-liner that takes someone else five minutes to decode.

### Maintainability
Code should be easy for a future developer, including future me, to change safely. That means clear structure, no hidden dependencies, and nothing that only makes sense if you remember exactly what you were thinking when you wrote it.

### Consistency
Following the project's existing style and conventions matters more than personal preference. A codebase where every file looks like it was written by a different person is much harder to navigate than one that's consistent, even if any individual choice isn't your favorite.

### Efficiency
Code should be reasonably performant, but chasing optimization before there's an actual performance problem usually just adds complexity for no measurable benefit. Write clear code first, optimize the part that's actually slow later.

### Messy code example and rewrite

Messy version:
```javascript
function calc(o) {
  let t = 0;
  for (let i = 0; i < o.length; i++) {
    if (o[i].s == 1) {
      t = t + o[i].p * o[i].q;
    }
  }
  if (t > 100) {
    t = t - t * 0.1;
  }
  return t;
}
```
This is hard to read because the function name and every variable are meaningless abbreviations, there's a magic number (100) and a magic discount rate (0.1) with no explanation, and the status check (`s == 1`) doesn't explain what status 1 actually means.

Cleaner rewrite:
```javascript
const BULK_DISCOUNT_THRESHOLD = 100;
const BULK_DISCOUNT_RATE = 0.1;
const ORDER_STATUS_CONFIRMED = 1;

function calculateConfirmedOrdersTotal(orders) {
  const total = orders
    .filter(order => order.status === ORDER_STATUS_CONFIRMED)
    .reduce((sum, order) => sum + order.price * order.quantity, 0);

  const isEligibleForBulkDiscount = total > BULK_DISCOUNT_THRESHOLD;
  return isEligibleForBulkDiscount
    ? total - total * BULK_DISCOUNT_RATE
    : total;
}
```
The named constants explain the "why" behind the numbers, the function and variable names describe what's actually happening, and using `filter`/`reduce` instead of a manual loop makes the intent clearer at a glance.

---

## 2. Code Formatting & Style Guides

### Why is code formatting important?
Consistent formatting means the team can focus on what the code does instead of being distracted by inconsistent spacing, quote styles, or bracket placement. It also makes diffs in pull requests much cleaner, since reviewers see only the actual logical change instead of noise from reformatting.

### Reviewing the Airbnb JavaScript style guide
The guide covers things like preferring `const`/`let` over `var`, consistent arrow function usage, strict equality (`===`), single quotes for strings, and trailing commas in multiline structures. Most of it matches habits I already lean toward, but having it written down as a shared standard removes any ambiguity for a whole team instead of everyone guessing at each other's preferences.

### Installing and configuring ESLint and Prettier
Installed both as dev dependencies (`npm install --save-dev eslint prettier eslint-config-prettier`), set up a `.eslintrc` extending a standard React Native config plus the Airbnb base rules, and a `.prettierrc` for consistent formatting (single quotes, semicolons, 2-space indentation). Configured ESLint to defer formatting concerns to Prettier so the two tools don't fight each other on the same rules.

### What issues did the linter detect?
Running it against some of my own existing code flagged unused variables, a few missing semicolons, inconsistent quote usage (mixing single and double quotes), and one case of a variable being reassigned that should have been declared with `const` instead of `let`.

### Did formatting the code make it easier to read?
Yes, noticeably. Consistent indentation and quote style alone made scanning the file faster, since my eyes weren't unconsciously snagging on small inconsistencies every few lines.

---

## 3. Naming Variables & Functions

### What makes a good variable or function name?
A name should describe what the thing actually is or does, specifically enough that you don't need to read the implementation to understand its purpose. Booleans read well as a question (`isEligibleForBulkDiscount`), functions read well as a verb phrase (`calculateConfirmedOrdersTotal`), and abbreviations should be avoided unless they're genuinely universal (like `id` or `url`).

### Examples of unclear names, and the refactor
Using the same example as above: `calc`, `o`, `t`, `s`, `p`, `q` gave no indication of what any of them represented. Renaming them to `calculateConfirmedOrdersTotal`, `orders`, `total`, `status`, `price`, `quantity` made the function readable without needing to trace through the logic first just to figure out what each variable held.

### What issues can arise from poorly named variables?
They force anyone reading the code, including the original author months later, to hold extra context in their head or reverse-engineer meaning from usage. This slows down debugging and code review, and increases the odds of someone misunderstanding a variable's purpose and introducing a bug while modifying it.

### How did refactoring improve code readability?
The refactored function can be understood just by reading its name and signature, without needing to read the body line by line to guess what it computes.

---

## 4. Writing Small, Focused Functions

### Why is breaking down functions beneficial?
A small function that does one thing is easier to test, easier to name accurately, and easier to reuse elsewhere. A large function that handles filtering, calculating, and formatting all at once is harder to modify safely, since a change aimed at one part risks breaking unrelated logic bundled into the same block.

### Example refactor
Extending the earlier example further, splitting it into single-purpose pieces:
```javascript
function getConfirmedOrders(orders) {
  return orders.filter(order => order.status === ORDER_STATUS_CONFIRMED);
}

function sumOrderTotal(orders) {
  return orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
}

function applyBulkDiscountIfEligible(total) {
  const isEligible = total > BULK_DISCOUNT_THRESHOLD;
  return isEligible ? total - total * BULK_DISCOUNT_RATE : total;
}

function calculateConfirmedOrdersTotal(orders) {
  const confirmedOrders = getConfirmedOrders(orders);
  const total = sumOrderTotal(confirmedOrders);
  return applyBulkDiscountIfEligible(total);
}
```

### How did refactoring improve the structure of the code?
Each small function can now be tested and understood independently, and `calculateConfirmedOrdersTotal` itself reads almost like plain English describing the three steps, instead of being one dense block doing all three at once.

---

## 5. Avoiding Code Duplication (DRY)

### What is the DRY principle?
"Don't Repeat Yourself" means logic should exist in exactly one place. If the same calculation or rule is copy-pasted in multiple spots, any future change has to be made correctly in every single copy, which is fragile and easy to get wrong.

### Example of duplication and refactor
Before, imagine the discount logic copy-pasted separately in two different places in a codebase (checkout screen and an order summary screen), each with its own slightly-different version of the same `0.1` discount math. After, both screens import and call the same shared `applyBulkDiscountIfEligible` function from a single utils file, so the discount rule only needs to be correct, and updated, in one place.

### What were the issues with duplicated code?
If the discount rate ever changed, someone would have to remember to update it in every copy, and it would be easy to miss one, leading to inconsistent behavior between screens that should agree.

### How did refactoring improve maintainability?
Now there's a single source of truth for the discount logic. Changing the rate or threshold once automatically applies everywhere it's used.

---

## 6. Refactoring Code for Simplicity

### What made the original code complex?
The original single-function version mixed filtering, math, and business rules together with no named constants, making it hard to see the actual logic through the noise of abbreviated variable names and inline magic numbers.

### How did refactoring improve it?
Breaking it into small, named functions with clear constants turned a dense, hard-to-parse block into a sequence of clearly labeled steps that reads almost like a description of the business process itself, without sacrificing any functionality.

---

## 7. Handling Errors & Edge Cases

### Strategies researched
Guard clauses (returning or throwing early for invalid input instead of nesting the "happy path" inside a big conditional), validating inputs before using them, and failing loudly with a clear error message rather than silently returning an incorrect result.

### Example: a function that doesn't handle errors, and the fix
Before:
```javascript
function calculateConfirmedOrdersTotal(orders) {
  const total = orders
    .filter(order => order.status === ORDER_STATUS_CONFIRMED)
    .reduce((sum, order) => sum + order.price * order.quantity, 0);
  return total;
}
```
This silently breaks if `orders` is `null`/`undefined`, or if an individual order is missing `price` or `quantity`.

After, using guard clauses:
```javascript
function calculateConfirmedOrdersTotal(orders) {
  if (!Array.isArray(orders)) {
    throw new Error('calculateConfirmedOrdersTotal expects an array of orders');
  }

  return orders
    .filter(order => order.status === ORDER_STATUS_CONFIRMED)
    .reduce((sum, order) => {
      const price = Number(order.price) || 0;
      const quantity = Number(order.quantity) || 0;
      return sum + price * quantity;
    }, 0);
}
```

### How does handling errors improve reliability?
It turns a silent, confusing bug (a wrong number showing up somewhere downstream with no explanation) into an immediate, clear failure right at the source, which is far faster to debug and prevents bad data from quietly propagating further into the app.

---

## 8. Writing Unit Tests for Clean Code

### How do unit tests help keep code clean?
Tests act as a safety net that lets you refactor confidently, since you can verify the behavior stayed correct after restructuring the code. Code that's hard to test is often a sign the function is doing too much or has too many hidden dependencies, so writing tests tends to naturally push toward smaller, more focused functions.

### Tests written (using Jest)
```javascript
import { calculateConfirmedOrdersTotal } from './orders';

test('sums only confirmed orders', () => {
  const orders = [
    { status: 1, price: 50, quantity: 1 },
    { status: 0, price: 999, quantity: 1 },
  ];
  expect(calculateConfirmedOrdersTotal(orders)).toBe(50);
});

test('applies bulk discount above threshold', () => {
  const orders = [{ status: 1, price: 60, quantity: 2 }];
  expect(calculateConfirmedOrdersTotal(orders)).toBeCloseTo(108);
});

test('throws on invalid input', () => {
  expect(() => calculateConfirmedOrdersTotal(null)).toThrow();
});
```

### What issues did you find while testing?
Writing the tests surfaced that the original function had no defined behavior for an empty array or invalid input until the error handling refactor was added, which the tests then confirmed correctly.

---

## Summary
This file tracks one function (order total calculation) refactored step by step through every clean code principle covered in this milestone, from a messy single block to a small, named, tested, and error-handled set of functions.
