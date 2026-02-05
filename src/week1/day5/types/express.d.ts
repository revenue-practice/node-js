import "express";

declare global {
    namespace Express {
        interface Request {
            requestId?: string;
            pagination?: { limit: number; offset: number };
        }
    }
}

export {};
