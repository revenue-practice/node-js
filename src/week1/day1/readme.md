## Mistakes, Learnings & Improvements

This project exposed multiple **edge cases and incorrect assumptions** I
initially made while writing basic utility functions. Below is a breakdown of
each mistake, what I learned from it, and why it matters for writing
**production-grade TypeScript code**.

---

### `isEven(n: number)`

**Mistake**

- Did not handle `NaN`.
- Used `Math.abs(n) % 2 == 0`, which silently fails for invalid numbers.

**Learning**

- `NaN` must be explicitly considered.
- Mathematical correctness does not guarantee runtime correctness.

**Why it matters**

- Silent failures cause hard-to-trace bugs.
- Utility functions should behave predictably for invalid inputs.

---

### `clamp(n, min, max)`

**Mistake**

- Error message was vague and inconsistent.
- Focused only on logic, not API usability.

**Learning**

- Error messages are part of the function contract.
- Errors should be clear, precise, and consistent.

**Why it matters**

- In production systems, errors are consumed by logs, monitoring tools, and
  other developers.
- Poor error messages slow debugging and reduce trust.

---

### `avg(nums: number[])` and `max(nums: number[])`

**Mistake**

- Initially did not handle empty arrays.
- Relied on `reduce` without validating inputs.

**Learning**

- Input validation is mandatory for aggregation functions.
- Empty collections are valid inputs and must be handled explicitly.

**Why it matters**

- `reduce` on empty arrays throws runtime errors.
- Defensive checks prevent crashes in real applications.

---

### `unique(nums: number[])`

**Mistake**

- Used `Set` without understanding iteration behavior.
- Did not think about implementing uniqueness logic manually.

**Learning**

- Built-in utilities should be understood, not blindly used.
- Manual implementation improves control and reasoning.

**Why it matters**

- Real-world scenarios may require:
    - Custom equality
    - Stable ordering
    - No access to certain built-ins

---

### `reverseWords(s: string)`

**Mistake**

- Overcomplicated logic using manual loops and string concatenation.
- Did not know about `.filter(Boolean)`.

**Learning**

- Array transformations are cleaner and safer than manual string manipulation.
- Simpler code is usually more correct.

**Why it matters**

- Manual loops increase bug surface area.
- Clean transformations improve readability and maintainability.

---

### `titleCase(s: string)`

**Mistake**

- Did not handle empty strings correctly.
- Did not normalize casing before capitalization.

**Learning**

- String utilities must handle:
    - Empty strings
    - Multiple spaces
    - Mixed casing

**Why it matters**

- User input is unpredictable.
- Poor string handling leads to UI and formatting bugs.

---

### `isPalindrome(s: string)`

**Mistake**

- Overengineered the solution with unnecessary variables and conditions.
- Tried to handle trimming inside the main logic.

**Learning**

- Preprocess input first, then apply the algorithm.
- Two-pointer solutions are simpler and more reliable.

**Why it matters**

- Complex control flow hides bugs.
- Cleaner logic improves correctness and performance.

---

### `safeJsonParse(s: string)`

**Mistake**

- Used `if (JSON.parse(s))`, which fails for valid JSON values like:
    - `0`
    - `false`
    - `null`
- Parsed JSON multiple times.

**Learning**

- Truthiness checks are unsafe for deserialization.
- Parsing should happen exactly once inside a try-catch.

**Why it matters**

- This is a classic production bug.
- Many APIs legitimately return `false`, `0`, or `null`.

---

## Key Takeaways

- Edge cases define code quality.
- Built-ins are tools, not magic.
- Defensive programming is mandatory for shared utilities.
- Silent failures are worse than loud, explicit errors.
- Cleaner code is easier to test, debug, and maintain.

---

## Outcome

This exercise helped me:

- Think like a **library author**, not a script writer.
- Understand the difference between TypeScript types and runtime behavior.
- Build habits required for **revenue-grade, production-safe code**.
