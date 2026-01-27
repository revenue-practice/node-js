import { test, expect } from "vitest";
import { add, isEven, clamp, sum, avg, max, unique, isPalindrome, reverseWords, titleCase, flatten, chunk, groupBy, countBy, pick, omit, deepClone, safeJsonParse } from "../src/drills";

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
    expect(() => avg([])).toThrowError();
});

test('Verify maximum of array', () => {
    expect(max([1, 2, 6, 4, 5])).toBe(6);
    expect(max([0])).toBe(0);
    expect(() => max([])).toThrowError();
});

test('Verify unique elements', () => {
    expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(unique([4, 5, 6])).toEqual([4, 5, 6]);
});

test('Flatten array', () => {
    expect(flatten<number>([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(flatten<number>([[1, 2], [3, 4], [4, 5, 6]])).toEqual([1, 2, 3, 4, 4, 5, 6]);
    expect(flatten([["a"], ["b", "c"]])).toEqual(["a", "b", "c"]);
});

test('Dividing array into chunks', () => {
    expect(chunk<number>([1, 2, 3, 2], 2)).toEqual([[1, 2], [3, 2]]);
    expect(chunk<number>([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]]);
    expect(chunk<string>(["1", "2", "3", "4", "5"], 3)).toEqual([["1", "2", "3"], ["4", "5"]]);
    expect(() => chunk<string>(["1"], 0)).toThrowError();
});

test('Generic group by', () => {
    const people = [
        { name: "A", city: "Delhi" },
        { name: "B", city: "Mumbai" },
        { name: "C", city: "Delhi" },
    ];

    expect(groupBy(people, p => p.city)).toEqual(
        {
            "Delhi": [{ city: "Delhi", name: "A" }, { city: "Delhi", name: "C" }],
            "Mumbai": [{ city: "Mumbai", name: "B" }]
        },
    );
});

test('Count group by', () => {
    const keyStrings: string[] = ["aa", "aa", "aa", "b", "c", "d"];
    expect(countBy(keyStrings, s => s.length)).toEqual({
        "1": 3,
        "2": 3
    });
});

test('Pick selective objects', () => {
    const keyStrings = {
        a: 1,
        b: 2
    };
    expect(pick(keyStrings, ["a"])).toEqual({ a: 1 });
    expect(pick(keyStrings, ["a", "b"])).toEqual(keyStrings);
    expect(pick(keyStrings, [])).toEqual({});
});

test('Omit selective objects', () => {
    const keyStrings = {
        a: 1,
        b: 2
    };
    expect(omit(keyStrings, ["a"])).toEqual({ b: 2 });
    expect(omit(keyStrings, ["a", "b"])).toEqual({});
    expect(omit(keyStrings, [])).toEqual(keyStrings);
});

test('Deep clone of the object', () => {
    const obj: any = {
        x: {
            y: 1, 
            z: 2
        },
        a: {
            b: {
                c: {
                    d: 3,
                    e: 4
                },
                f: 5,
                g: 6
            },
            h: 7,
            i: 8
        }
    };
    const cloneObj = deepClone(obj);
    cloneObj.x = 1; cloneObj.a = {
        b: {
            c: 3,
            f: 4
        }
    };

    const arr = [ [1, [2, [3, 4], 5], 6], 7 ];
    const cloneArr = deepClone(arr);
    cloneArr[1] = 8;

    expect(obj).toStrictEqual({
        x: {
            y: 1, 
            z: 2
        },
        a: {
            b: {
                c: {
                    d: 3,
                    e: 4
                },
                f: 5,
                g: 6
            },
            h: 7,
            i: 8
        }
    });
    expect(cloneObj).not.toEqual(obj);
    
    expect(arr).toStrictEqual([ [1, [2, [3, 4], 5], 6], 7 ] );
    expect(cloneArr).not.toEqual(arr);
});

test('Verify pallindromic string', () => {
    expect(isPalindrome("aba")).toBe(true);
    expect(isPalindrome("abc")).toBe(false);
    expect(isPalindrome(" abc ")).toBe(false);
});

test('Verify reveresed string', () => {
    expect(reverseWords("Hello world")).toBe("world Hello");
    expect(reverseWords("")).toBe("");
    expect(reverseWords("   ")).toBe("");
    expect(reverseWords(". ")).toBe(".");
});

test('Verify title Strings', () => {
    expect(titleCase("heLLo woRLD")).toBe("Hello World");
    expect(titleCase(" HELLO TIMMY  ")).toBe("Hello Timmy");
});

test('Parse json safely', () => {
    const person = '{"name":"Ankit","age":23,"city":"Ranchi"}';
    const falsePerson = '{"name":"Ankit","age":23,"city":Ranchi}';

    expect(safeJsonParse(person)).toEqual({ ok: true, value: person });
    expect(safeJsonParse(falsePerson)).toEqual({ ok: false, error: "Unexpected token R in JSON at position 32" });
});