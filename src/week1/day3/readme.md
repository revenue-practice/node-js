## Network, Testing, and Node.js Learnings (Day 1–3)

This phase focused on **network requests, mocking, async behavior, type inference, and file system interactions in Node.js**. It also exposed several habits that are common at junior level but unacceptable in production code.

---

## What I Learned

### Fetch in Node.js 18
- Node 18 provides a **built-in `fetch` API**.
- No external dependency is required for standard HTTP requests.
- Aligning with platform-native APIs reduces dependency surface and complexity.

**Why it matters**
- Lower bundle size
- Fewer third-party risks
- Easier maintenance

---

### Axios vs Fetch
- Axios adds conveniences but hides lower-level behavior.
- Specs sometimes **require fetch**, not “any HTTP client”.

**Why it matters**
- In real systems, the *choice of tool is part of the contract*.
- Using the wrong tool breaks expectations even if output “looks right”.

---

### Network Request Mocking
- Learned to mock network calls instead of hitting real endpoints.
- Tests should not depend on:
  - Network
  - Time
  - External services

**Why it matters**
- Deterministic tests
- Faster CI
- Zero flakiness

---

### Type Inference
- Letting TypeScript infer types is often safer than forcing annotations.
- Over-annotation hides real type errors.

**Why it matters**
- Inference catches more bugs with less code.
- Forced types can lie.

---

### File Writing in Node.js
- Learned correct async file handling.
- File writes must:
  - Be awaited
  - Finish before process exit
  - Preserve valid file formats (e.g. JSON)

**Why it matters**
- File bugs appear only under load or timing pressure.
- These are the hardest bugs to reproduce.

---

## Mistakes (and What They Taught Me)

### 1. Treating Specs as “Suggestions”

**What I did wrong**
- Used `axios` instead of required `fetch + fetchJson`.
- Wrote output to `data/` instead of `data/day3/`.
- Skipped usage messages and exact error strings.

**Lesson**
- Specs are contracts, not hints.
- If you can’t follow written requirements exactly, you can’t build APIs others rely on.

---

### 2. Writing Wrong Code + Weak Tests

**Examples**
- `chunk()` end condition was incorrect.
- `safeJsonParse()` returned the input string instead of parsed value.
- `pickFields()` added missing keys with `undefined` (violated spec).

**Root cause**
- Tests didn’t assert:
  - Exact output
  - Exact error messages

**Lesson**
- Weak tests create false confidence.
- Tests should *fail loudly* when behavior is wrong.

---

### 3. Breaking Error Message Contracts

**What I did**
- Changed messages like:
  - `"invalid integer"` → `"Invalid integer"`
  - `"expected object"` → `"obj must be an object"`

**Lesson**
- Error messages are part of the public API.
- Changing them breaks:
  - Tests
  - Logs
  - Alerting systems
  - Downstream consumers

---

### 4. Bad Async / File Patterns (Node Rookie Mistakes)

**Mistakes**
- Used `fs.appendFile` inside async flows.
- Threw errors inside callbacks expecting outer `try/catch` to catch them.
- Returned before file writes completed.
- Appended multiple JSON objects into one file (invalid JSON).

**Lesson**
- Async boundaries matter.
- If you don’t understand them, bugs will surface only in production.

---

### 5. Flaky Tests Due to Time Dependence

**What I did**
- Compared `generatedAt` directly with `new Date().toISOString()`.

**Lesson**
- Tests must be deterministic.
- Time must be mocked or frozen.

---

### 6. Unnecessary Cleverness

**Examples**
- Used `Object.create(null)` where `{}` was sufficient.
- Used `value !== value` instead of `Number.isNaN`.

**Lesson**
- Clever code increases cognitive load.
- Simple, explicit code wins—especially early.

---

### 7. “It Works” Without Evidence

**What I did**
- Claimed CLI output matched spec without showing updated code or output.

**Lesson**
- Engineering runs on reproducibility, not confidence.
- Proof > claims.

---

## Core Rule Learned

> **Write code that obeys the contract, and write tests that would fail if you disobey it.**

---

## Outcome

By the end of Day 3, I improved at:
- Reading and following specs precisely
- Writing stricter, more meaningful tests
- Understanding Node.js async behavior
- Treating error messages and output formats as contracts
- Distinguishing “working code” from **correct code**

---

**Day 4 starts with this baseline.**
No shortcuts forward.
