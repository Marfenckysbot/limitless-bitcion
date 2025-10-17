export function envBool(key: string, defaultValue = false): boolean {
  const v = process.env[key]
  if (v === undefined) return defaultValue
  return v === 'true' || v === '1' || v === 'yes'
}

export function envNumber(key: string, defaultValue = 0): number {
  const v = process.env[key]
  if (!v) return defaultValue
  const n = Number(v)
  return isNaN(n) ? defaultValue : n
}

export function envString(key: string, defaultValue = ''): string {
  return process.env[key] ?? defaultValue
}