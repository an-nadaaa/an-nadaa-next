// qs.d.ts

declare module 'qs' {
  interface IStringifyOptions {
    delimiter?: string
    strictNullHandling?: boolean
    skipNulls?: boolean
    encode?: boolean
    encoder?: (str: any, defaultEncoder?: any, charset?: string, type?: 'key' | 'value') => string
    filter?: Array<string | number> | ((prefix: string, value: any) => any)
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
    indices?: boolean
    sort?: (a: any, b: any) => number
    serializeDate?: (date: Date) => string
    format?: 'RFC1738' | 'RFC3986'
    encodeValuesOnly?: boolean
    addQueryPrefix?: boolean
    allowDots?: boolean
    charset?: 'utf-8' | 'iso-8859-1'
    charsetSentinel?: boolean
    delimiterSentinel?: string
  }

  interface IParseOptions {
    delimiter?: string | RegExp
    depth?: number | false
    arrayLimit?: number
    parseArrays?: boolean
    allowDots?: boolean
    plainObjects?: boolean
    allowPrototypes?: boolean
    parameterLimit?: number
    strictNullHandling?: boolean
    ignoreQueryPrefix?: boolean
    charset?: 'utf-8' | 'iso-8859-1'
    charsetSentinel?: boolean
    interpretNumericEntities?: boolean
  }

  interface Formats {
    default: 'RFC3986'
    formatters: {
      [key: string]: (value: string) => string
    }
    RFC1738: 'RFC1738'
    RFC3986: 'RFC3986'
  }

  export function stringify(obj: any, options?: IStringifyOptions): string

  export function parse(str: string, options?: IParseOptions): any

  export const formats: Formats
}
