/** Deep-clone object and replace string leaves using dot-path map (e.g. "p1.guide.0.title"). */
export function applyStringMap<T>(base: T, map: Record<string, string>): T {
  const clone = structuredClone(base);
  for (const [path, value] of Object.entries(map)) {
    setByPath(clone as Record<string, unknown>, path, value);
  }
  return clone;
}

function setByPath(obj: Record<string, unknown>, path: string, value: string): void {
  const keys = path.split(".");
  let cur: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const next = cur[k];
    if (next === undefined || typeof next !== "object" || next === null) return;
    cur = next as Record<string, unknown>;
  }
  const last = keys[keys.length - 1];
  if (last in cur && typeof cur[last] === "string") {
    cur[last] = value;
  }
}
