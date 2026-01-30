import { test, expect } from "vitest";
import {
    isPalindrome,
    reverseWords,
    titleCase,
} from "../../../src/week1/day1/drills";

test("Check for pallindrome", () => {
    expect(isPalindrome(" aba ")).toStrictEqual(true);
    expect(isPalindrome("a b a")).toStrictEqual(true);
    expect(isPalindrome("A b a")).toStrictEqual(false);
    expect(isPalindrome("")).toStrictEqual(true);
    expect(isPalindrome("A   b   A")).toStrictEqual(true);
});

test("Reverse words", () => {
    expect(reverseWords("hello  world ")).toStrictEqual("world hello");
    expect(reverseWords("hello I     am     Ankit")).toStrictEqual(
        "Ankit am I hello",
    );
    expect(reverseWords("   ")).toStrictEqual("");
});

test("Title case", () => {
    expect(titleCase("hello  i   am  the World")).toStrictEqual(
        "Hello I Am The World",
    );
    expect(titleCase("HELLO TIMMY")).toStrictEqual("Hello Timmy");
    expect(titleCase("                  ")).toStrictEqual("");
});