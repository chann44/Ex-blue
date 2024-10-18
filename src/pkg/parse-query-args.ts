function parseQueryParam(value: string): any {
  try {
    return JSON.parse(value);
  } catch (e) {
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (value === "undefined") return undefined;
    if (!isNaN(Number(value))) return Number(value);
    return value;
  }
}

function parseQueryParams(query: Record<string, string>): Record<string, any> {
  const parsed: Record<string, any> = {};
  for (const [key, value] of Object.entries(query)) {
    parsed[key] = parseQueryParam(value);
  }
  return parsed;
}
