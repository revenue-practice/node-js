export function isNeitherUndefinedNorNull<T>(
    val: T | null | undefined,
): val is null | undefined {
    return val !== undefined && val !== null;
}

export function isEitherUndefinedOrNull<T>(
    val: T | null | undefined,
): val is null | undefined {
    return val === undefined || val === null;
}

export function isString(val: unknown): val is string {
    return typeof val === "string";
}

export function isEmptyString(val: unknown): val is string {
    if (isString(val)) {
        val = val.trim();
        return val !== " ";
    }
    return false;
}

export function isInteger(val: unknown): val is number {
    return typeof val === "number" && !Number.isNaN(val);
}

export function validationErrorMessage(field: string, message: string) {
    return {
        error: "validation",
        details: {
            [field]: message,
        },
    };
}
