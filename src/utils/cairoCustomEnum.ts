import {CairoCustomEnum} from 'starknet'

export function parseCairoCustomEnum<T extends Record<string, unknown>>(
  type: T,
  value: unknown,
): T[keyof T] {
  if (value instanceof CairoCustomEnum) {
    const enumName = value.activeVariant()
    if (enumName in type) {
      return type[enumName] as T[keyof T]
    }
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    'variant' in value &&
    typeof value.variant === 'object' &&
    value.variant !== null
  ) {
    const variant = value.variant as Record<string | number | symbol, unknown>

    for (const key in variant) {
      if (!(key in type)) continue

      const enumValue = variant[key]
      if (enumValue !== undefined && enumValue !== null) {
        return type[key] as T[keyof T]
      }
    }
  }

  throw new Error('Invalid enum')
}

export function toCairoCustomEnum<T extends string>(value: T) {
  return new CairoCustomEnum({[value]: {}}) as unknown as Record<T, void>
}
