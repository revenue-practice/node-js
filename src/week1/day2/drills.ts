import { isEitherUndefinedOrNull } from "../../utils/helper";

export function parseIntStrict(s: string): number {
    s = s.trim();
    if (s.length) {
        let isNegative = false;
        if (s[0] === "-") {
            s = s.slice(1);
            isNegative = true;
        }

        for (const val of s) {
            if (!(val >= "0" && val <= "9"))
                throw new Error("Must be a valid integer");
        }

        const value: number = parseInt(s);
        if (value !== value) throw new Error("Invalid integer");

        return isNegative ? value * -1 : value;
    }
    throw new Error("Not a numeric string");
}

export function pickFields(
    obj: unknown,
    keys: string[],
): Record<string, unknown> {
    if (Array.isArray(obj) || !(obj instanceof Object))
        throw new Error("obj must be an object");

    const result: Record<string, unknown> = Object.create(null);
    for (const key of keys) {
        const value: unknown = (obj as Record<string, unknown>)[key];
        if (isEitherUndefinedOrNull(value)) continue;
        result[key] = value;
    }

    return result;
}
