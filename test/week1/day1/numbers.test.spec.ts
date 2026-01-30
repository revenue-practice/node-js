import { test, expect } from "vitest";
import { add, clamp, isEven } from "../../../src/week1/day1/drills";

test("Add two numbers", () => {
    expect(add(2, 3)).toStrictEqual(5);
    expect(add(2, -3)).toStrictEqual(-1);
    expect(add(-2, -3)).toStrictEqual(-5);
    expect(add(-2, 3)).toStrictEqual(1);
    expect(add(2, 0)).toStrictEqual(2);
    expect(add(0, 0)).toStrictEqual(0);
});

test("Check number if even", () => {
    expect(isEven(2)).toStrictEqual(true);
    expect(isEven(-2)).toStrictEqual(true);
    expect(isEven(0)).toStrictEqual(true);
    expect(isEven(1)).toStrictEqual(false);
});

test("Clampped numbers", () => {
    expect(() => clamp(7, 0, -2)).toThrowError();
    expect(() => clamp(7, 0, -2)).toThrow("min must be <= than max");
    expect(clamp(7, 4, 9)).toStrictEqual(7);
    expect(clamp(11, 4, 9)).toStrictEqual(9);
    expect(clamp(2, 4, 9)).toStrictEqual(4);
});