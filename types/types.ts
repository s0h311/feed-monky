import type { Database } from './databaseTypes'

export type Feedback = SnakeToCamelCaseNested<Database['public']['Tables']['feedback']['Row']>
export type FeedbackSummary = SnakeToCamelCaseNested<Database['public']['Tables']['feedback_summary']['Row']>
export type Site = SnakeToCamelCaseNested<Database['public']['Tables']['site']['Row']>
export type Subscription = SnakeToCamelCaseNested<Database['public']['Tables']['subscription']['Row']>

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

export type SnakeToCamelCaseNested<T> = T extends object
  ? T extends (infer U)[]
    ? U extends object
      ? {
          [K in keyof U as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<U[K]>
        }[]
      : T
    : {
        [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>
      }
  : T
