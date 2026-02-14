import type {
  OptionsConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'

import antfu from '@antfu/eslint-config'
import pluginTanstackQuery from '@tanstack/eslint-plugin-query'
import pluginTanstackRouter from '@tanstack/eslint-plugin-router'
import pluginEffector from 'eslint-plugin-effector'
import pluginPrettier from 'eslint-plugin-prettier'

export type EslintOptions = Omit<
  OptionsConfig,
  'lessOpinionated' | 'stylistic'
> &
  TypedFlatConfigItem & {
    /**
     * Enable stylistic rules.
     *
     * @see https://eslint.style/
     * @default false
     */
    stylistic?: boolean

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

    /**
     * Enable rules for Effector.
     *
     * @see https://eslint.effector.dev
     * @default false
     */
    effector?: boolean
  }

export function eslint({
  stylistic = false,
  nextjs,
  prettier = true,
  tanstackRouter,
  tanstackQuery,
  effector,
  ...options
}: EslintOptions = {}) {
  const configs: TypedFlatConfigItem[] = []

  if (prettier) {
    configs.push({
      name: 'notcodev/prettier/setup',
      plugins: { prettier: pluginPrettier },
    })

    configs.push({
      name: 'notcodev/prettier/rules',
      rules: {
        'prettier/prettier': 'warn',
      },
    })
  }

  if (stylistic) {
    configs.push({
      name: 'notcodev/stylistic',
      rules: {
        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': 'off',
        'style/comma-dangle': ['error', 'never'],
        'style/indent': ['error', 2, { SwitchCase: 1 }],
        'style/jsx-curly-newline': 'off',
        'style/jsx-one-expression-per-line': 'off',
        'style/jsx-quotes': ['error', 'prefer-single'],
        'style/linebreak-style': ['error', 'unix'],
        'style/max-len': [
          'error',
          70,
          2,
          {
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
          },
        ],
        'style/member-delimiter-style': 'off',
        'style/multiline-ternary': 'off',
        'style/no-tabs': 'error',
        'style/operator-linebreak': 'off',
        'style/quote-props': 'off',
        'style/quotes': [
          'error',
          'single',
          { allowTemplateLiterals: true },
        ],
      },
    })
  }

  configs.push({
    name: 'notcodev/unicorn/rules',
    rules: {
      'unicorn/filename-case': [
        'error',
        { case: 'kebabCase', ignore: ['^.*\.(vue|md)$'] },
      ],
    },
  })

  configs.push({
    name: 'notcodev/imports/rules',
    ignores: [
      // Ignore config files because usually config files has default export
      '**/@(*.config.{ts,cts,mts,js,cjs,mjs}|.prettierrc.{js,cjs,mjs})',
    ],
    rules: {
      'import/no-default-export': nextjs ? 'off' : 'warn',
    },
  })

  configs.push({
    name: 'notcodev/perfectionist/rules',
    rules: {
      'perfectionist/sort-array-includes': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type-import',
            ['value-builtin', 'value-external'],
            'type-internal',
            'value-internal',
            ['type-parent', 'type-sibling', 'type-index'],
            ['value-parent', 'value-sibling', 'value-index'],
            'side-effect',
            'side-effect-style',
            'unknown',
          ],
          internalPattern: ['^~/.*', '^@/.*'],
          newlinesBetween: 1,
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          groups: ['property', 'member', 'method', 'index-signature'],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: [
            {
              groupName: 'reserved',
              elementNamePattern: '^(key|ref)$',
            },
            {
              groupName: 'callback',
              elementNamePattern: '^on[A-Z].*',
            },
          ],
          groups: [
            'reserved',
            'unknown',
            'callback',
            'shorthand-prop',
            'multiline-prop',
          ],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          groups: [
            'conditional',
            'function',
            'import',
            'intersection',
            'keyword',
            'literal',
            'named',
            'object',
            'operator',
            'tuple',
            'union',
            'nullish',
          ],
          order: 'asc',
          specialCharacters: 'keep',
          type: 'alphabetical',
        },
      ],
    },
  })

  if (options.react) {
    configs.push({
      name: 'notcodev/react/rules',
      rules: {
        'react/jsx-no-undef': 'error',
        'react/prefer-destructuring-assignment': 'warn',
        'react/no-useless-fragment': 'warn',
        'react/prefer-shorthand-boolean': 'warn',
        'react-hooks-extra/no-direct-set-state-in-use-effect': nextjs
          ? 'off'
          : 'warn',
      },
    })
  }

  if (tanstackQuery) {
    configs.push({
      name: 'notcodev/tanstack-query/setup',
      plugins: { '@tanstack/query': pluginTanstackQuery },
    })

    configs.push({
      name: 'notcodev/tanstack-query/rules',
      rules: pluginTanstackQuery.configs.recommended.rules,
    })
  }

  if (tanstackRouter) {
    configs.push({
      name: 'notcodev/tanstack-router/setup',
      plugins: { '@tanstack/router': pluginTanstackRouter },
    })

    configs.push({
      name: 'notcodev/tanstack-router/rules',
      rules: pluginTanstackRouter.configs.recommended.rules,
    })
  }

  if (effector) {
    configs.push({
      name: 'notcodev/effector/setup',
      plugins: { effector: pluginEffector },
    })

    configs.push({
      name: 'notcodev/effector/rules',
      rules: {
        ...pluginEffector.flatConfigs.recommended.rules,
        ...pluginEffector.flatConfigs.patronum.rules,
        ...pluginEffector.flatConfigs.future.rules,
        ...pluginEffector.flatConfigs.scope.rules,
        ...(options.react
          ? pluginEffector.flatConfigs.react.rules
          : {}),
      },
    })
  }

  return antfu(
    { ...options, stylistic, nextjs, lessOpinionated: true },
    configs,
  )
}
