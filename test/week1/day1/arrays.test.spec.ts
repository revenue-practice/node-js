import { test, expect } from 'vitest';
import { sum, avg, max, unique, flatten } from '../../../src/week1/day1/drills';

test('Sum of array', () => {
    expect(sum([1, 2, 3])).toStrictEqual(6);
    expect(sum([])).toStrictEqual(0);
    expect(sum([0])).toStrictEqual(0);
});

test('Average of array', () => {
    expect(() => avg([])).toThrowError();
    expect(avg([1, 2, 3])).toStrictEqual(2);
    expect(avg([-1, -2, 3])).toStrictEqual(0);
    expect(avg([-1, -2, -3, -3])).toStrictEqual(-2.25);
});


test('Maximum of array', () => {
    expect(() => max([])).toThrowError();
    expect(max([-1, -2, 3])).toStrictEqual(3);
    expect(max([-1, -2, -3, -3])).toStrictEqual(-1);
});

test('Unique elements in array', () => {
    expect(unique([1, 1, 2, 2, 4, 3, 4])).toStrictEqual([1, 2, 4, 3]);
    expect(unique([])).toStrictEqual([]);
    expect(unique([-1, -1.2, -1.2, -1, -4, -5, -4])).toStrictEqual([-1, -1.2, -4, -5]);
});

test('Flatten array', () => {
    expect(flatten([[1,2],[3,4]])).toEqual([1,2,3,4]);
    expect(flatten([[1],[2,3],[]])).toEqual([1,2,3]);
    expect(flatten<string>([["a"],["b","c"]])).toEqual(["a","b","c"]);
});