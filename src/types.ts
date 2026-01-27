export type safeJsonParsePass = { ok: true, value: unknown };
export type safeJsonParseFail = { ok: false, error: string };
export type safeJsonParseResult = safeJsonParsePass | safeJsonParseFail;