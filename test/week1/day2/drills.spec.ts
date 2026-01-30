import { test, expect } from "vitest";
import { parseIntStrict, pickFields } from "../../../src/week1/day2/drills";

test("Strictly parsing integer", () => {
    expect(parseIntStrict("123")).toEqual(123);
    expect(parseIntStrict("003")).toEqual(3);
    expect(parseIntStrict("-9")).toEqual(-9);
    expect(parseIntStrict(" 42 ")).toEqual(42);
    expect(() => parseIntStrict(" ")).toThrowError();
    expect(() => parseIntStrict("")).toThrowError();
    expect(() => parseIntStrict("12a")).toThrowError();
    expect(() => parseIntStrict("1.2")).toThrowError();
    expect(() => parseIntStrict("+")).toThrowError();
    expect(() => parseIntStrict("--1")).toThrowError();
    expect(() => parseIntStrict("-")).toThrowError();
});

test("Pick some objects", () => {
    expect(pickFields({ a: 1, b: 2 }, ["a", "c"])).toEqual({ a: 1 });
    expect(pickFields({ a: undefined }, ["a"])).toEqual({ a: undefined });
    expect(() => pickFields(null, ["a"])).toThrowError();
    expect(() => pickFields([1, 2], ["0"])).toThrowError();
    expect(() => pickFields("x", ["length"])).toThrowError();
});