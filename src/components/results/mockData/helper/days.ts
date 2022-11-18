export function days(config: { count: number }) {
  const cfg = config || {};
  const count = cfg.count || 7;
  const values = [];

  for (let i = 1; i <= count; ++i) {
    values.push(i);
  }

  return values;
}
