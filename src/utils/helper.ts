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
