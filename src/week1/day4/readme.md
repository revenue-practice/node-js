## Testing & Server Learnings (Day 4)

This phase focused on **HTTP testing, request validation, mocking behavior, and time control**. It also highlighted several workflow and architectural mistakes that cause wasted effort and unstable systems.

---

## What I Learned

### 1. How `supertest` Mocks Requests

- `supertest` can test HTTP endpoints **without starting a real network server**.
- Requests are executed directly against the Express/Fastify app instance.

**Why it matters**

- Faster tests
- No port conflicts
- No flaky network behavior

---

### 2. How _Not_ to Mock Modules (Seeding & In-Memory State)

- Mocking the wrong module prevented in-memory data from being mutated.
- Learned when **not** to mock so that:
    - Seed data
    - Shared state
    - Test setup logic
      behave correctly.

**Why it matters**

- Over-mocking breaks realism.
- Some modules must stay real to validate actual behavior.

---

### 3. Request Validation

- Learned to validate:
    - Query parameters
    - Request body
    - Missing or malformed inputs
- Validation errors must return:
    - Correct HTTP status
    - Exact error message

**Why it matters**

- Prevents invalid data from entering the system.
- Makes APIs predictable and self-documenting.

---

### 4. Fake Timers vs Real Timers

- Used fake timers to control time-dependent behavior.
- Switched back to real timers when required.

**Why it matters**

- Deterministic tests
- No flakiness
- Precise control over time-based logic

---

## Mistakes

### 1. Too Many Rookie-Level Errors

- Missed obvious edge cases.
- Had to fix the same logic multiple times.

**Lesson**

- Slow down.
- Think before coding.
- Write tests that force correctness early.

---

### 2. Server Started Twice

- Opened two server instances during tests.
- Caused:
    - Port conflicts
    - Unpredictable behavior
    - Debugging noise

**Lesson**

- In tests, **never start the server manually** if the framework handles it.
- One app instance, one lifecycle.

---

### 3. Excessive Rework

- Rewrote large portions of code due to:
    - Misunderstood specs
    - Weak initial design
    - Late discovery of test failures

**Lesson**

- Rework is a tax you pay for poor upfront thinking.
- Better planning saves more time than faster typing.

---

## Core Takeaway

> **Test the app, not the network.  
> Mock carefully.  
> Control time.  
> Start the server exactly once.**

---

## Outcome

By the end of this phase, I improved at:

- Writing stable HTTP tests
- Understanding when mocks help vs harm
- Managing shared in-memory state
- Controlling time deterministically
- Avoiding common server-testing pitfalls

This marks the transition from **toy testing** to **production-grade API testing**.
