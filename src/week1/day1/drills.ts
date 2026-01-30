import { isEitherUndefinedOrNull } from "../../utils/helper";

export function add(a: number, b: number): number {
    return a + b;
}

export function isEven(n: number): boolean {
    return n % 2 === 0;
}

export function clamp(n: number, min: number, max: number): number {
    if (min > max) throw new Error("min must be <= than max");
    if (n <= min) return min;
    if (n >= max) return max;
    return n;
}

export function sum(nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
}

export function avg(nums: number[]): number {
    if (!nums.length)
        throw new Error("avg() must contain at least one element");
    return sum(nums) / nums.length;
}

export function max(nums: number[]): number {
    if (!nums.length)
        throw new Error("max() must contain at least one element");
    return nums.reduce((a, b) => (a >= b ? a : b));
}

export function unique(nums: number[]): number[] {
    const seen = new Set<number>();
    const out: number[] = [];
    for (const n of nums) {
        if (!seen.has(n)) {
            seen.add(n);
            out.push(n);
        }
    }
    return out;
}

export function flatten<T>(arr: T[][]): T[] {
    return arr.flat();
}

export function isPalindrome(s: string): boolean {
    s = s.trim();
    let i = 0,
        j = s.length - 1;
    while (i < j) {
        if (s[i] !== s[j]) return false;
        i += 1;
        j -= 1;
    }

    return true;
}

export function reverseWords(s: string): string {
    const words = s.split(/\s+/).filter(Boolean);
    return words.reverse().join(" ");
}

export function titleCase(s: string): string {
    const words: string[] = s.split(/\s+/).filter(Boolean);
    for (let index = 0; index < words.length; index += 1) {
        const word = words[index];
        if (isEitherUndefinedOrNull(word)) continue;

        const lowerCaseWord: string = word.toLowerCase();
        words[index] =
            lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    }

    return words.join(" ");
}

export function safeJsonParse(
    s: string,
): { ok: true; value: unknown } | { ok: false; error: string } {
    let message = "";
    try {
        const value = JSON.parse(s);
        return { ok: true, value };
    } catch (error) {
        message = error instanceof Error ? error.message : String(error);
    }

    return { ok: false, error: message };
}