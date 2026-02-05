import { describe, it, expect } from "vitest";
import { createApp } from "../../../src/week1/day5/app";
import request from "supertest";
import { HealthRoutes } from "../../../src/week1/day5/health/routes.constants";

describe("Health Check API", () => {
    const app = createApp();

    it("Health Check", async () => {
        const response = await request(app)
            .get(HealthRoutes.getHealthRoute())
            .send({});
        expect(response.status).toStrictEqual(200);
        expect(response.headers["x-request-id"]).toBeTruthy();
        expect(response.body).deep.equal({ ok: true });
    });
});
