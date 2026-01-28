export function add(a: number, b: number): number {
    return a + b;
};

export function isEven(n: number) : boolean {
    return Math.abs(n) % 2 == 0;
};

export function clamp(n: number, min: number, max: number): number {
    if(min > max) throw new Error("Min should be less than max");
    if(n <= min) return min;
    if(n >= max) return max;
    return n;
};

export function sum(nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
};

export function avg(nums: number[]): number {
    if(!nums.length) throw new Error("avg() must contain at least one element");
    return sum(nums) / nums.length;
};

export function max(nums: number[]): number {
    if(!nums.length) throw new Error("max() must contain at least one element");
    return nums.reduce((a, b) => a >= b ? a : b);
};

export function unique(nums: number[]): number[] {
    const result: number[] = [];
    const uniqueEle = new Set(nums);

    for(const value of uniqueEle) result.push(value);

    return result;
};

export function flatten<T>(arr: T[][]): T[] {
    return arr.flat(); 
}

export function isPalindrome(s: string): boolean {
    const n = s.length;
    let untrimmedString = "", i = 0, j = n - 1, isPalindrome = true;
    while(i < j) {
        while(i < n && i < j && s[i] === '') i++;
        while(j >= 0 && j > i && s[j] === '') j--;

        if(s[i] === s[j]) {
            i += 1; j -= 1;
        }
        else {
            isPalindrome = false;
            break;
        }
    }

    return isPalindrome;
}

export function reverseWords(s: string): string {
    const words = s.split(/\s+/);
    let reverseWords = "";

    for(let index = words.length - 1; index >= 0; index -= 1) {
        reverseWords += words[index];
        reverseWords += " ";
    }   
    reverseWords = reverseWords.trim();

    return reverseWords;
};

export function titleCase(s: string): string {
    const words = s.split(/\s+/);
    let modifiedString = "";
    for(const word of words) {
        modifiedString += (word.charAt(0).toUpperCase() + word.slice(1));
        modifiedString += " ";
    }   
    modifiedString = modifiedString.trim();

    return modifiedString;
};

export function safeJsonParse(s: string): { ok: true, value: string } | { ok: false, error: string } {
    let message = "";
    try {
        if(JSON.parse(s)) return { ok: true, value: JSON.parse(s) };
    }
    catch (error) {
        message = error instanceof Error ? error.message : ""; 
    }

    return { ok: false, error: message };
}

