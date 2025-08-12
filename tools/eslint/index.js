import antfu from '@antfu/eslint-config'
import pluginNext from '@next/eslint-plugin-next'
import pluginTanstackQuery from '@tanstack/eslint-plugin-query'
import pluginTanstackRouter from '@tanstack/eslint-plugin-router'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginPrettier from 'eslint-plugin-prettier'

/** @type {import('@notcodev/eslint').Eslint} */
export function eslint({
  jsxA11y,
  stylistic = false,
  next,
  prettier = true,
  tanstackRouter,
  tanstackQuery,
  ...options
} = {}) {
  /**
   * @type {import('@antfu/eslint-config').TypedFlatConfigItem[]}
   */
  const configs = []

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
      'import/no-default-export': next ? 'off' : 'warn',
    },
  })

  configs.push({
    name: 'notcodev/perfectionist/rules',
    rules: {
      'perfectionist/sort-array-includes': [
        'error',
        { order: 'asc', type: 'alphabetical' },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            ['internal'],
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'style',
            'side-effect-style',
            'unknown',
          ],
          internalPattern: ['^~/.*', '^@/.*'],
          newlinesBetween: 'always',
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          groups: ['unknown', 'method', 'multiline'],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: { callback: 'on*', reserved: ['key', 'ref'] },
          groups: [
            'reserved',
            'multiline',
            'unknown',
            'callback',
            'shorthand',
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
        'react-hooks/no-direct-set-state-in-use-effect': next
          ? 'off'
          : 'warn',
      },
    })
  }

  if (next) {
    configs.push({
      name: 'notcodev/next/setup',
      plugins: { '@next/next': pluginNext },
    })

    configs.push({
      name: 'notcodev/next/rules',
      rules: pluginNext.configs.recommended.rules,
    })
  }

  if (jsxA11y) {
    configs.push({
      name: 'notcodev/jsx-a11y/setup',
      plugins: { 'jsx-a11y': pluginJsxA11y },
    })

    configs.push({
      name: 'notcodev/jsx-a11y/rules',
      rules: pluginJsxA11y.configs.recommended.rules,
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

  return antfu(
    { ...options, stylistic, lessOpinionated: true },
    configs,
  )
}
