## `parseIntStrict` and `pickFields` — Mistakes, Learnings & Improvements

These utilities forced me to confront **JavaScript coercion, equality semantics, object prototypes, and type safety**, which are easy to ignore but dangerous in production code.

---

### `parseIntStrict(s: string)`

**Problem Being Solved**

- JavaScript’s `parseInt` and `Number` allow partial parsing and coercion:
    - `"12abc"` → `12`
    - `" "` → `0`
- This function enforces **strict integer parsing**.

**Mistakes / Oversights**

- Initially underestimated how permissive JavaScript number parsing is.
- Did not fully account for:
    - Leading/trailing whitespace
    - Standalone `"-"`
    - Non-digit characters
    - `NaN` propagation

**Learnings**

- Input must be:
    - Trimmed
    - Validated character by character
    - Parsed only after validation
- Sign handling should be explicit, not implicit.

**Why this matters**

- Silent coercion causes security and data-integrity bugs.
- Strict parsing is mandatory for:
    - User input
    - Configuration files
    - Financial and ID-based systems

---

### `pickFields(obj, keys)`

**Problem Being Solved**

- Safely extract a subset of fields from an object without:
    - Prototype pollution
    - Accidental inheritance
    - Runtime type errors

**Mistakes / Oversights**

- Initially did not validate that `obj` was a plain object.
- Did not consider prototype chains when creating result objects.

**Learnings**

- `typeof obj === "object"` is not sufficient.
- Arrays and `null` must be explicitly excluded.
- `Object.create(null)` creates a **truly empty object** with:
    - No prototype
    - No inherited properties

**Why this matters**

- Prevents prototype pollution attacks.
- Guarantees clean, predictable objects.
- Essential when handling untrusted input.

---

## Testing Learnings

### Equality Methods

**Key Learning**

- Understanding equality assertions is critical for reliable tests:

| Method          | Behavior                                                |
| --------------- | ------------------------------------------------------- |
| `toEqual`       | Deep comparison, ignores prototype                      |
| `toStrictEqual` | Deep comparison + checks prototype and undefined fields |
| `deep.equal`    | Similar to `toEqual`, framework-dependent               |

**Why this matters**

- `Object.create(null)` will:
    - Pass `toEqual`
    - Fail `toStrictEqual`
- Wrong matcher choice leads to **false positives in tests**.

---

## Additional Learnings

### Object Prototypes

- `Object.create(null)` produces objects without:
    - `toString`
    - `hasOwnProperty`
- Safer for maps and sanitized outputs.

---

### Linting

- Linting exposed:
    - Unsafe type assertions
    - Missing explicit returns
    - Inconsistent error handling

**Learning**

- Linting is not cosmetic — it enforces discipline.

---

### Type Checking

- `unknown` forces explicit runtime validation.
- Type assertions (`as`) should be:
    - Minimal
    - Local
    - Justified

**Learning**

- TypeScript types do not protect runtime behavior.
- Runtime checks are non-negotiable.

---

## Key Takeaways

- JavaScript is permissive by default — production code must not be.
- Equality semantics affect test correctness.
- Prototypes are a hidden source of bugs and vulnerabilities.
- Strict validation + strict testing = reliable utilities.

---

## Outcome

These functions improved my understanding of:

- Runtime vs compile-time safety
- Input validation strategies
- Prototype-safe object creation
- Writing tests that actually catch bugs

This is the level of thinking required for **library and backend code**, not just scripts.
