export function add(a: number, b: number): number {
    return a + b;
};

export function isEven(x: number): boolean {
    return x % 2 == 0;
}

export function clamp(n: number, min: number, max: number): number {
    if(n <= min) return min;
    if(n >= max) return max;
    return n;
};

export function sum(nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
};

export function avg(nums: number[]): number {
    if(nums.length === 0) return 0;
    return sum(nums)/nums.length;
};

export function max(nums: number[]): number {
    return nums.reduce((a, b) => a >= b ? a : b, 0);
};

export function unique(nums: number[]): number[] {
    const uniqueEle = new Set(nums);
    const result: number[] = [];
    for(const value of uniqueEle) result.push(value);

    return result;
};

export function isPalindrome(s: string): boolean {
    s = s.trim();
    let start = 0, end = s.length - 1;
    while(start < end) {
        if(s[start] != s[end]) return false;

        start += 1;
        end -= 1;
    }

    return true;
};

const reverse = (s: string): string => {
    let newS = "";
    for(let index = s.length - 1; index >= 0; index -= 1) newS += s[index];
    return newS;
}

export function reverseWords(s: string): string { 
    const words = s.split(/\s+/);
    let reveresedString = "";
    for(let index = words.length - 1; index >= 0; index -= 1) {
        reveresedString += words[index];
        reveresedString += " ";
    }
    reveresedString = reveresedString.trim();

    return reveresedString;
}

export function titleCase(s: string): string { throw new Error("TODO"); }