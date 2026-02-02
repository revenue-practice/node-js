import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/week1/day4/app";
import { mockNotes, mockResultResponseAtFetch } from "./mock-data";
import { __seedNotes } from "../../../src/week1/day4/notesStore";

describe("Health Check", () => {
    const app = createApp();

    it("Health Check", async () => {
        const response = await request(app).get("/health").send({});

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            ok: true,
        });
    });
});

describe("Post notes validation", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    const app = createApp();

    it("Success validation", async () => {
        const response = await request(app).post("/notes").send({
            title: "Physical Discipline",
            body: "Total abstinence from sexual feelings",
        });

        expect(response.status).toEqual(201);
        expect(response.body).toMatchObject({
            title: "Physical Discipline",
            body: "Total abstinence from sexual feelings",
        });
    });

    it("Error for missing title", async () => {
        const response = await request(app).post("/notes").send({
            body: "Total abstinence from sexual feelings",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { title: "Title must be a valid string" },
            }),
        );
    });

    it("Error for title length > 80 characters", async () => {
        const response = await request(app).post("/notes").send({
            title: "This is a very long note title designed specifically to exceed the eighty character validation limit number 3",
            body: "Total abstinence from sexual feelings",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { title: "Title length should be <= 80" },
            }),
        );
    });

    it("Error for missing body", async () => {
        const response = await request(app).post("/notes").send({
            title: "Physical Discipline",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { body: "Body must be a valid string" },
            }),
        );
    });

    it("Error for body length > 2000 characters", async () => {
        const response = await request(app).post("/notes").send({
            title: "This is a very long note title designed",
            body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { body: "Body length should be <= 2000" },
            }),
        );
    });
});

describe("Fetch notes via id validation", () => {
    const app = createApp();

    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("Success validation", async () => {
        const response = await request(app).get("/notes/note_1").send({});

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: "note_1",
            title: "CI pipeline rules",
            body: "All pull requests must pass lint, typecheck, tests, and build.",
            createdAt: "2026-01-21T07:20:00.000Z",
            updatedAt: "2026-01-21T07:20:00.000Z",
        });
    });

    it("Failure validation", async () => {
        const response = await request(app).get("/notes/123").send({});

        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ error: "not found" });
    });
});

describe("Fetch notes validation", () => {
    const app = createApp();

    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("Success validation", async () => {
        const response = await request(app).get("/notes").send({});

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            items: mockResultResponseAtFetch,
            total: 3,
            limit: 20,
            offset: 0,
        });
    });

    it("Success validation", async () => {
        const response = await request(app)
            .get("/notes?limit=1&offset=1")
            .send({});

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            items: [mockResultResponseAtFetch[1]],
            total: 3,
            limit: 1,
            offset: 1,
        });
    });
});

describe("Update notes validation", () => {
    const app = createApp();

    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("Success validation", async () => {
        const response = await request(app).put("/notes/note_3").send({
            title: "Edge cases to test before release",
            body: "Test empty inputs, long text, invalid IDs, and unexpected payloads.",
        });

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
            id: "note_3",
            title: "Edge cases to test before release",
            body: "Test empty inputs, long text, invalid IDs, and unexpected payloads.",
        });
    });

    it("Failure validation", async () => {
        const response = await request(app).put("/notes/note_4").send({
            title: "Edge cases to test before release",
            body: "Test empty inputs, long text, invalid IDs, and unexpected payloads.",
        });

        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ error: "not found" });
    });

    it("Error for missing title", async () => {
        const response = await request(app).put("/notes/123").send({
            body: "Total abstinence from sexual feelings",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { title: "Title must be a valid string" },
            }),
        );
    });

    it("Error for title length > 80 characters", async () => {
        const response = await request(app).put("/notes/123").send({
            title: "This is a very long note title designed specifically to exceed the eighty character validation limit number 3",
            body: "Total abstinence from sexual feelings",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { title: "Title length should be <= 80" },
            }),
        );
    });

    it("Error for missing body", async () => {
        const response = await request(app).put("/notes/123").send({
            title: "Physical Discipline",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { body: "Body must be a valid string" },
            }),
        );
    });

    it("Error for body length > 2000 characters", async () => {
        const response = await request(app).put("/notes/123").send({
            title: "This is a very long note title designed",
            body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { body: "Body length should be <= 2000" },
            }),
        );
    });
});

describe("Delete notes validation", () => {
    const app = createApp();

    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("Success validation", async () => {
        const response = await request(app).delete("/notes/note_3").send({});

        expect(response.status).toEqual(204);
        expect(response.body).toMatchObject({});
    });

    it("Failure validation", async () => {
        const response = await request(app).delete("/notes/note_4").send({});

        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ error: "not found" });
    });
});
