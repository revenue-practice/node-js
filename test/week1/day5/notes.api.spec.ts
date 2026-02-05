import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/week1/day5/app";
import { mockNotes, mockResultResponseAtFetch } from "./mock-data";
import { __seedNotes } from "../../../src/week1/day5/notes/store";
import { NotesRoutes } from "../../../src/week1/day5/notes/routes.constants";
import { NotesError } from "../../../src/week1/day5/notes/errors";
import { ErrorConstants } from "../../../src/week1/day5/middleware/errors.constants";

describe("Post notes validation", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    const app = createApp();

    it("Success validation", async () => {
        const response = await request(app)
            .post(NotesRoutes.getDefaultRoute())
            .send({
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
        const response = await request(app)
            .post(NotesRoutes.getDefaultRoute())
            .send({
                body: "Total abstinence from sexual feelings",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidTitleType, field: NotesError.title },
        ]);
    });

    it("Error for title length > 80 characters", async () => {
        const response = await request(app)
            .post(NotesRoutes.getDefaultRoute())
            .send({
                title: "This is a very long note title designed specifically to exceed the eighty character validation limit number 3",
                body: "Total abstinence from sexual feelings",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidTitleLength, field: NotesError.title },
        ]);
    });

    it("Error for missing body", async () => {
        const response = await request(app)
            .post(NotesRoutes.getDefaultRoute())
            .send({
                title: "Physical Discipline",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidBodyType, field: NotesError.body },
        ]);
    });

    it("Error for body length > 2000 characters", async () => {
        const response = await request(app)
            .post(NotesRoutes.getDefaultRoute())
            .send({
                title: "This is a very long note title designed",
                body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidBodyLength, field: NotesError.body },
        ]);
    });
});

describe("Fetch notes via id validation", () => {
    const app = createApp();

    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("Success validation", async () => {
        const response = await request(app)
            .get(`${NotesRoutes.getDefaultRoute()}/note_1`)
            .send({});

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
        const response = await request(app)
            .get(`${NotesRoutes.getDefaultRoute()}/123`)
            .send({});

        expect(response.statusCode).toEqual(404);
        expect(response.body).deep.equal([
            { message: ErrorConstants.notFound },
        ]);
    });
});

describe("Fetch notes validation", () => {
    const app = createApp();

    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("Success validation", async () => {
        const response = await request(app)
            .get(`${NotesRoutes.getDefaultRoute()}`)
            .send({});

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
            .get(`${NotesRoutes.getDefaultRoute()}?limit=1&offset=1`)
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
        const response = await request(app)
            .put(`${NotesRoutes.getDefaultRoute()}/note_3`)
            .send({
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
        const response = await request(app)
            .put(`${NotesRoutes.getDefaultRoute()}/note_4`)
            .send({
                title: "Edge cases to test before release",
                body: "Test empty inputs, long text, invalid IDs, and unexpected payloads.",
            });

        expect(response.statusCode).toEqual(404);
        expect(response.body).deep.equal([
            { message: ErrorConstants.notFound },
        ]);
    });

    it("Error for missing title", async () => {
        const response = await request(app)
            .put(`${NotesRoutes.getDefaultRoute()}/123`)
            .send({
                body: "Total abstinence from sexual feelings",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidTitleType, field: NotesError.title },
        ]);
    });

    it("Error for title length > 80 characters", async () => {
        const response = await request(app)
            .put(`${NotesRoutes.getDefaultRoute()}/123`)
            .send({
                title: "This is a very long note title designed specifically to exceed the eighty character validation limit number 3",
                body: "Total abstinence from sexual feelings",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidTitleLength, field: NotesError.title },
        ]);
    });

    it("Error for missing body", async () => {
        const response = await request(app)
            .put(`${NotesRoutes.getDefaultRoute()}/123`)
            .send({
                title: "Physical Discipline",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidBodyType, field: NotesError.body },
        ]);
    });

    it("Error for body length > 2000 characters", async () => {
        const response = await request(app)
            .put(`${NotesRoutes.getDefaultRoute()}/123`)
            .send({
                title: "This is a very long note title designed",
                body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note",
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).deep.equal([
            { message: NotesError.invalidBodyLength, field: NotesError.body },
        ]);
    });
});

describe("Delete notes validation", () => {
    const app = createApp();

    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("Success validation", async () => {
        const response = await request(app)
            .delete(`${NotesRoutes.getDefaultRoute()}/note_1`)
            .send({});

        expect(response.statusCode).toEqual(204);
    });

    it("Failure validation", async () => {
        const response = await request(app)
            .delete(`${NotesRoutes.getDefaultRoute()}/123`)
            .send({});

        expect(response.statusCode).toEqual(404);
        expect(response.body).deep.equal([
            { message: ErrorConstants.notFound },
        ]);
    });
});
