export function parseIntStrict(s: string): number {
    s = s.trim();
    if (s.length) {
        let isNegative = false;
        if (s[0] === "-") {
            s = s.slice(1);
            isNegative = true;
        }

        if (!s.length) throw new Error("invalid integer");

        for (const val of s) {
            if (!(val >= "0" && val <= "9")) throw new Error("invalid integer");
        }

        const value: number = Number(s);
        if (Number.isNaN(value)) throw new Error("invalid integer");

        return isNegative ? value * -1 : value;
    }
    throw new Error("invalid integer");
}

export function pickFields(
    obj: unknown,
    keys: string[],
): Record<string, unknown> {
    if (!(typeof obj === 'object' && !Array.isArray(obj) && obj !== null))
        throw new Error("expected object");

    const record: Record<string, unknown> =  (obj as Record<string, unknown>);
    const result: Record<string, unknown> = Object.create(null);
    for (const key of keys) {
        if (Object.hasOwn(obj, key)) result[key] = record[key];
    }

    return result;
}
