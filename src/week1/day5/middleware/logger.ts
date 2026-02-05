import { Request, Response, NextFunction } from "express";

export const loggingRouter = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const start = Date.now();

    res.on("finish", () => {
        const responseTime = Date.now() - start;
        const requestId = req.requestId;

        console.log(`Request: ${requestId} with response time ${responseTime}`);
    });

    next();
};
