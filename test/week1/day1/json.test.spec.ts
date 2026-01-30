import { test, expect } from "vitest";
import { safeJsonParse } from "../../../src/week1/day1/drills";

test("Safely parse json", () => {
    expect(
        safeJsonParse('{"name":"John","age":30,"city":"New York"}'),
    ).toStrictEqual({
        ok: true,
        value: { name: "John", age: 30, city: "New York" },
    });
    expect(
        safeJsonParse('{"name":"John","age":30,city":New York"}'),
    ).toStrictEqual({
        ok: false,
        error: "Unexpected token c in JSON at position 24",
    });
    expect(safeJsonParse("{}")).toStrictEqual({ ok: true, value: {} });
    expect(safeJsonParse("0")).toStrictEqual({ ok: true, value: 0 });
    expect(safeJsonParse("null")).toStrictEqual({ ok: true, value: null });
    expect(safeJsonParse("false")).toStrictEqual({ ok: true, value: false });
    expect(safeJsonParse("undefined")).toStrictEqual({
        ok: false,
        error: "Unexpected token u in JSON at position 0",
    });
});