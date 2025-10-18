export const genId = (prefix: string = "id") =>
    `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

export function deepMerge<T>(base: T, patch: Partial<T>): T {
    const out: any = Array.isArray(base) ? [...(base as any)] : { ...base };
    for (const [k, v] of Object.entries(patch as any)) {
        if (
            v && typeof v === "object" && !Array.isArray(v) &&
            typeof (out as any)[k] === "object" && (out as any)[k] !== null &&
            !Array.isArray((out as any)[k])
        ) {
            (out as any)[k] = deepMerge((out as any)[k], v);
        } else {
            (out as any)[k] = v as any;
        }
    }
    return out;
}
export const withDefaults = <T>(base: T, typeDefaults: Partial<T> | undefined, overrides: Partial<T>) =>
    deepMerge(deepMerge(base, typeDefaults ?? {} as Partial<T>), overrides);
