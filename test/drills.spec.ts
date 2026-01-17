import { test, expect } from "vitest";
import { add, isEven, clamp, sum, avg, max, unique, isPalindrome, reverseWords } from "../src/drills";

test('Verify integer addition', () => {
    expect(add(1, 2)).toBe(3);
});

test('Very even number', () => {
    expect(isEven(2)).toStrictEqual(true);
    expect(isEven(0)).toStrictEqual(true);
    expect(isEven(-2)).toStrictEqual(true);
    expect(isEven(1)).toStrictEqual(false);
});

test('Verify clamp method', () => {
    expect(clamp(7, 0, 9)).toBe(7);
    expect(clamp(-12, -4, 5)).toBe(-4);
    expect(clamp(18, 3, 9)).toBe(9);
});

test('Verify sum of array', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
    expect(sum([0])).toBe(0);
    expect(sum([])).toBe(0);
});

test('Verify average of array', () => {
    expect(avg([1, 2, 3, 4, 5])).toBe(3);
    expect(avg([0])).toBe(0);
    expect(avg([])).toBe(0);
});

test('Verify maximum of array', () => {
    expect(max([1, 2, 6, 4, 5])).toBe(6);
    expect(max([0])).toBe(0);
    expect(max([])).toBe(0);
});

test('Verify unique elements', () => {
    expect(unique([1, 2, 2, 3])).toStrictEqual([1, 2, 3]);
    expect(unique([4, 5, 6])).toStrictEqual([4, 5, 6]);
});

test('Verify pallindromic string', () => {
    expect(isPalindrome("aba")).toStrictEqual(true);
    expect(isPalindrome("abc")).toStrictEqual(false);
    expect(isPalindrome(" abc ")).toStrictEqual(false);
});

test('Verify reveresed string', () => {
    expect(reverseWords("Hello world")).toStrictEqual("world Hello");
    expect(reverseWords("")).toStrictEqual("");
    expect(reverseWords("   ")).toStrictEqual("");
    expect(reverseWords(". ")).toStrictEqual(".");
});
