import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { ConfigNames } from '@antfu/eslint-config'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

declare module '@neo/eslint' {
  export type EslintOptions = OptionsConfig &
    TypedFlatConfigItem & {
      jsxA11y?: boolean
    }

  export type Eslint = (
    options?: EslintOptions,
  ) => FlatConfigComposer<TypedFlatConfigItem, ConfigNames>

  export const eslint: Eslint
}
