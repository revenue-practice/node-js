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

export function flatten<T>(arr: T[][]): T[] {
    return Object.values(arr.flat());
};

export function chunk<T>(arr: (T[] | T)[], size: number): T[][] {
    if(!size) throw new Error('Chunk size cannot be zero');

    let chunk = size, result: T[][] = [], tempValues: T[] = [];
    for(let index = 0; index < arr.length; index += 1) {
        if(Array.isArray(arr[index])) {
            const element: T[] = arr[index] as T[];
            for(let curr = 0; curr < element.length; curr += 1) {
                if(chunk) {
                    tempValues.push(element[curr]);
                    chunk -= 1;
                }
                if(!chunk) {
                    chunk = size;
                    result.push(tempValues);
                    tempValues = [];
                }
            }
        }
        else {
            const element = arr[index] as T;
            if(chunk) {
                tempValues.push(element);
                chunk -= 1;
            }
            if(!chunk) {
                chunk = size;
                result.push(tempValues);
                tempValues = [];
            }
        }        
    }

    if(!chunk) result.push(tempValues);

    return result;
};

export function groupBy<T>(arr: T[], keyFn: (x: T) => string): Record<string, T[]> {
    const result: Record<string, T[]> = {};
    for(const value of arr) {
        const key: string = keyFn(value);
        if(result.hasOwnProperty(key)) {
            result[key].push(value);
        }
        else {
            result[key] = [];
            result[key].push(value);
        }
    }

    return result;
};

export function countBy<T>(arr: T[], keyFn: (x: T) => number): Record<string, number> {
    const result: Record<string, number> = {};
    for(const value of arr) {
        const key = String(keyFn(value));
        if(result.hasOwnProperty(key)) {
            result[key] = result[key] + 1;
        }
        else {
            result[key] = 1;
        }
    }
    return result;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result: Partial<Pick<T, K>> = {};

    for(const key of keys) {
        if(key in obj) result[key] = obj[key];
    }

    return result as Pick<T, K>;
};

export function omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
    const result: Partial<T> = {};
    const keySet = new Set<PropertyKey>(keys as readonly PropertyKey[]);

    for(const [key] of Object.entries(obj)) {
        if(!keySet.has(key)) result[key] = obj[key];
    }

    return result as Omit<T, K>;
}

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

export function titleCase(s: string): string { 
    const words = s.split(/\s+/);
    let result = "";
    for(let index = 0; index < words.length; index += 1) {
        let curr = words[index]; 
        curr = curr.trim();
        curr = curr.toLowerCase();
        curr = curr.charAt(0).toUpperCase() + curr.slice(1);

        result += curr; result += " ";
    }
    result = result.trim();

    return result;
}