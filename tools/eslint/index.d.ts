import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { ConfigNames } from '@antfu/eslint-config'
import type { OptionsOverrides } from '@antfu/eslint-config'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

declare module '@notcodev/eslint' {
  export type EslintOptions = Omit<OptionsConfig, 'lessOpinionated' | 'react' | 'stylistic'> &
    TypedFlatConfigItem & {
      /**
       * Enable react rules.
       *
       * @see https://eslint-react.xyz
       * @default false
       */
      react?: boolean | OptionsOverrides

      /**
       * Enable stylistic rules.
       *
       * @see https://eslint.style/
       * @default false
       */
      stylistic?: boolean

      /**
       * Enable a11y rules on JSX elements.
       *
       * @default false
       */
      jsxA11y?: boolean

      /**
       * Enable Next.js rules.
       *
       * @see https://nextjs.org/docs/app/api-reference/config/eslint
       * @default false
       */
      next?: boolean

      /**
       * Enable prettier rules.
       *
       * @default true
       */
      prettier?: boolean

      /**
       * Enable rules for TanStack Query.
       *
       * @see https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
       * @default false
       */
      tanstackQuery?: boolean

      /**
       * Enable rules for TanStack Router.
       *
       * @see https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router
       * @default false
       */
      tanstackRouter?: boolean
    }

  export type Eslint = (
    options?: EslintOptions,
  ) => FlatConfigComposer<TypedFlatConfigItem, ConfigNames>

  export const eslint: Eslint
}
