````markdown
# Backend Development: Day 5 - Middleware, Types, & Testing

This phase focused on Express middleware architecture, centralized error handling, TypeScript type composition, and structured testing patterns used in production-grade backends.

---

## 📖 What I Learned

### 1. Middleware Architecture & Application

Middleware acts as the glue of an Express application. I explored how to apply logic at various levels:

- **Application Level:** `app.use(globalLogger)`
- **Router Level:** `apiRouter.use(rateLimiter)`
- **Route Level:** `app.get('/admin', isAdmin, handler)`

### 2. Execution Flow & Sequential Logic

Middleware executes in the order it is defined. Each function must call `next()` to pass control, or the request will hang.
**Flow:** `Request` → `Middleware A` → `Middleware B` → `Route Handler` → `Response`

### 3. Centralized Error Handling

Instead of scattered `try/catch` blocks, I implemented a global "Safety Net." This ensures consistent API responses and cleaner code.

```ts
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
```
````

### 4. Advanced TypeScript Integration

To bridge the gap between Express and TypeScript, I utilized:

- **Type Intersections:** Combining types (e.g., `Request & { user: User }`).
- **Namespace Overriding:** Extending the global Express interface to include custom properties like `req.user`.

```ts
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
```

### 5. OOP Patterns in Testing

I moved away from functional test scripts to a **Class-Based Approach**:

- **Abstract Classes:** Defined shared behaviors for setup and teardown.
- **Static Methods:** Created utility helpers for repetitive tasks (e.g., generating mock data).

### 6. Strict Request–Response Typing

I implemented explicit typing for Request bodies, Query parameters, and Responses to prevent runtime shape mismatches and improve IDE autocompletion.

```ts
type CreateUserBody = { name: string; email: string };

app.post("/users", (req: Request<{}, {}, CreateUserBody>, res: Response) => {
    // req.body is now strictly typed
    res.status(201).json({ message: "User created" });
});
```

---

## 🛠️ Core Takeaways

- **Middleware** defines the backend structure and security.
- **Types** ensure safety and prevent "undefined" errors at runtime.
- **Centralization** of errors makes the system reliable and easier to monitor.

## 🏁 Outcomes

- [x] Structured middleware layers correctly.
- [x] Implemented safe type-extension for the Request object.
- [x] Built a reusable, class-based test suite.
- [x] Developed type-safe request-response flows.
