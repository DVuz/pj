function snakeToCamelObj<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map(item => snakeToCamelObj(item)) as T;
  }

  if (input && typeof input === 'object' && input.constructor === Object) {
    const out: Record<string, unknown> = {};

    for (const key in input as Record<string, unknown>) {
      const val = (input as Record<string, unknown>)[key];
      const camelKey = key.replace(/_([a-z0-9])/g, (_, ch) => ch.toUpperCase());
      out[camelKey] = snakeToCamelObj(val);
    }

    return out as T;
  }

  return input;
}
export default snakeToCamelObj;
