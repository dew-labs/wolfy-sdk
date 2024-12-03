import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {fixupConfigRules} from '@eslint/compat'
import {FlatCompat} from '@eslint/eslintrc'
import eslint from '@eslint/js'
import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import pluginGitignore from 'eslint-config-flat-gitignore'
import pluginDepend from 'eslint-plugin-depend'
// import {plugin as pluginExceptionHandling} from 'eslint-plugin-exception-handling'
import pluginImportX from 'eslint-plugin-import-x'
// import pluginJsdoc from 'eslint-plugin-jsdoc'
import pluginJsonc from 'eslint-plugin-jsonc'
import pluginNoBarrelFiles from 'eslint-plugin-no-barrel-files'
import pluginNoOnlyTests from 'eslint-plugin-no-only-tests'
import pluginNoRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import pluginNoSecrets from 'eslint-plugin-no-secrets' // TODO: Leave this functionality for another step
import pluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginPromise from 'eslint-plugin-promise'
import * as pluginRegexp from 'eslint-plugin-regexp'
import pluginSecurity from 'eslint-plugin-security'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
// import pluginSonarjs from 'eslint-plugin-sonarjs' // TODO: investigate why this cause errors
// import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginVitest from 'eslint-plugin-vitest'
import globals from 'globals'
// eslint-disable-next-line import-x/no-unresolved -- import-x error
import tsEslint from 'typescript-eslint'

import globs from './globs.js'
import {CAMEL_CASE} from './regexes.js'

const flatCompat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
})

//------------------------------------------------------------------------------

function createApplyTo(include, exclude = []) {
  return (name, configs, enabled = true) => {
    if (!enabled) {
      return []
    }

    let config = configs

    if (Array.isArray(configs)) {
      if (configs.length > 1) {
        return configs.map((cfg, index) => ({
          ...cfg,
          name: `${name}-${index}`,
          files: include,
          ignores: exclude,
        }))
      }

      config = configs.at(0)
    }

    return [
      {
        ...config,
        name,
        files: include,
        ignores: exclude,
      },
    ]
  }
}

const applyTo = {
  all: createApplyTo(globs.SCRIPT_AND_JSONS),
  script: createApplyTo(globs.SCRIPT),
  json: createApplyTo(globs.JSON, globs.NOT_JSON),
  jsonc: createApplyTo(globs.JSONC, globs.NOT_JSONC),
  json5: createApplyTo(globs.JSON5, globs.NOT_JSON5),
  jsonC5: createApplyTo(globs.JSONC5),
  typescript: createApplyTo(globs.TYPESCRIPT),
  react: createApplyTo(globs.REACT),
  javascriptReact: createApplyTo(globs.REACT_JAVASCRIPT),
  typescriptReact: createApplyTo(globs.REACT_TYPESCRIPT),
  test: createApplyTo(globs.TEST, globs.TEST_2E2),
  testNotReact: createApplyTo(globs.TEST_NOT_REACT, globs.TEST_2E2),
  testReact: createApplyTo(globs.TEST_REACT, globs.TEST_2E2),
  testE2E: createApplyTo(globs.TEST_2E2),
}

//------------------------------------------------------------------------------

function getIgnoreConfigs() {
  return [
    pluginGitignore({
      root: true,
      files: ['.gitignore'],
      strict: false,
    }),
    {
      ignores: ['public/*', '**/*.gen.ts', 'vitest.config.ts.timestamp*', 'src/abis/*'],
    },
  ]
}

function getCoreConfigs() {
  return [
    ...applyTo.all('core/recommended', eslint.configs.recommended),
    ...applyTo.all('core/custom', {
      rules: {
        'camelcase': ['error', {allow: ['contract_address']}],
        'grouped-accessor-pairs': 'error',
        'accessor-pairs': 'error',
        // 'default-case': ['error', {commentPattern: '^skip\\sdefault'}],
        'default-case-last': 'error',
        // 'default-param-last': 'error',
        'no-promise-executor-return': 'error',
        'no-self-compare': 'error',
        'no-template-curly-in-string': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-useless-assignment': 'error',
        'no-await-in-loop': 'error',
        'require-atomic-updates': 'error',
        'eqeqeq': 'error',
        'func-name-matching': 'error',
        'func-names': ['error', 'as-needed'],
        'no-caller': 'error',
        'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
        'no-div-regex': 'error',
        'no-else-return': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-label-var': 'error',
        'no-implicit-coercion': ['error', {allow: ['!!', '~']}],
        'no-return-assign': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-new': 'error',
        'no-invalid-this': 'error',
        'no-implicit-globals': 'error',
        // 'no-magic-numbers': 'error',
        'no-multi-assign': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-proto': 'error',
        'no-object-constructor': 'error',
        'no-octal-escape': 'error',
        // 'no-param-reassign': 'error',
        'no-script-url': 'error',
        'no-sequences': ['error', {allowInParentheses: true}],
        // 'no-shadow': 'error',
        'no-undef-init': 'error',
        'no-unneeded-ternary': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-bitwise': 'error',
        'no-implied-eval': 'error',
        'no-unused-expressions': 'error',
        // 'new-cap': 'error',
        'object-shorthand': 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-named-capture-group': 'error',
        'prefer-object-spread': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'prefer-object-has-own': 'error',
        'prefer-promise-reject-errors': 'error',
        'guard-for-in': 'error',
        'symbol-description': 'error',
        'yoda': 'error',
      },
    }),
    ...applyTo.all('core/security', pluginSecurity.configs.recommended),
    ...applyTo.all('core/promise', pluginPromise.configs['flat/recommended']),
    ...applyTo.all('core/promise/custom', {
      rules: {
        'promise/always-return': ['warn', {ignoreLastCallback: true}],
        'promise/no-callback-in-promise': [
          'warn',
          {
            exceptions: ['process.nextTick', 'setImmediate', 'setTimeout'],
          },
        ],
      },
    }),
    ...applyTo.all('core/import-x', pluginImportX.flatConfigs.recommended),
    ...applyTo.all('core/import-x/custom', {
      rules: {
        'import-x/no-unresolved': 'error',
        'import-x/order': 'off',
        'import-x/namespace': 'off',
      },
    }),
    ...applyTo.all('core/no-use-extend-native', pluginNoUseExtendNative.configs.recommended),
    ...applyTo.all('core/eslint-comments', {
      ...pluginEslintComments.configs.recommended,
      // workaround for https://github.com/eslint-community/eslint-plugin-eslint-comments/issues/215
      plugins: {
        '@eslint-community/eslint-comments': pluginEslintComments,
      },
    }),
    ...applyTo.all('core/eslint-comments/custom', {
      rules: {
        '@eslint-community/eslint-comments/require-description': [
          'error',
          {ignore: ['eslint-enable']},
        ],
      },
    }),
    ...applyTo.all('core/regexp', pluginRegexp.configs['flat/recommended']),
    ...applyTo.all(
      'core/ssr-friendly',
      fixupConfigRules(flatCompat.extends('plugin:ssr-friendly/recommended')),
    ),
    ...applyTo.all('core/depend', pluginDepend.configs['flat/recommended']),
    // ...applyTo.all('core/sonarjs', pluginSonarjs.configs.recommended), // drop this if using SonarQube or SonarCloud in favor of the IDE extension
    // ...applyTo.all('core/sonarjs/custom', {
    //   rules: {
    //     'sonarjs/no-duplicate-string': 'warn',
    //   },
    // }),
    ...applyTo.all('core/no-relative-import-paths', {
      plugins: {
        'no-relative-import-paths': pluginNoRelativeImportPaths,
      },
      rules: {
        'no-relative-import-paths/no-relative-import-paths': [
          'warn',
          {allowSameFolder: true, rootDir: 'src', prefix: '@'},
        ],
      },
    }),
    ...applyTo.all('core/simple-import-sort', {
      plugins: {
        'simple-import-sort': pluginSimpleImportSort,
      },
      rules: {
        'sort-imports': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    }),
    ...applyTo.all('core/no-barrel-files', {
      plugins: {
        'no-barrel-files': pluginNoBarrelFiles, // switch to eslint-plugin-barrel-files?
      },
      rules: {
        'no-barrel-files/no-barrel-files': 'error',
      },
    }),
    ...applyTo.all('core/no-secrets', {
      plugins: {
        'no-secrets': pluginNoSecrets,
      },
      rules: {
        'no-secrets/no-secrets': [
          'error',
          {
            tolerance: 4.5,
            ignoreContent: [new RegExp(CAMEL_CASE)],
          },
        ],
      },
    }),
    // TODO: investigate why this is causing issues
    // ...applyTo.all('core/exception-handling', {
    //   plugins: {
    //     'exception-handling': pluginExceptionHandling,
    //   },
    //   rules: {
    //     'exception-handling/no-unhandled': 'error',
    //     'exception-handling/might-throw': 'error',
    //     'exception-handling/use-error-cause': 'error',
    //   },
    // }),
    // TODO: enable later
    // ...applyTo.all('core/jsdoc', pluginJsdoc.configs['flat/recommended-typescript-error']),
    // ...applyTo.all('core/unicorn', pluginUnicorn.configs['flat/recommended']),
    // ...applyTo.all('core/unicorn/custom', {
    //   rules: {
    //     // 'unicorn/better-regex': 'warn',
    //     // 'unicorn/filename-case': [
    //     //   'error',
    //     //   {
    //     //     cases: {
    //     //       kebabCase: true,
    //     //       pascalCase: true,
    //     //     }
    //     //   }
    //     // ],
    //   },
    // }),
  ]
}

function getJsonConfigs() {
  return [
    ...applyTo.json('json/json', pluginJsonc.configs['flat/recommended-with-json']),
    ...applyTo.jsonc('json/jsonc', pluginJsonc.configs['flat/recommended-with-jsonc']),
    ...applyTo.json5('json/json5', pluginJsonc.configs['flat/recommended-with-json5']),
    ...applyTo.jsonC5('json', pluginJsonc.configs['flat/prettier']),
  ]
}

function getTypescriptConfigs() {
  return [
    ...applyTo.typescript('typescript/import-x', {
      ...pluginImportX.flatConfigs.typescript,
      settings: {
        'import-x/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts', '.mtsx', '.ctsx'],
        },
        'import-x/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
          node: true,
        },
      },
    }),
    ...applyTo.typescript('typescript/strict', tsEslint.configs.strictTypeChecked),
    ...applyTo.typescript('typescript/stylistic', tsEslint.configs.stylisticTypeChecked),
    ...applyTo.typescript('typescript', {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {
        // Our own rules set
        '@typescript-eslint/consistent-type-exports': [
          'error',
          {fixMixedExportsWithInlineTypeSpecifier: false},
        ],
        '@typescript-eslint/promise-function-async': ['error'],
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            caughtErrors: 'all',
            ignoreRestSiblings: false,
            reportUsedIgnorePattern: true,
            varsIgnorePattern: '^(?!__)_.*|^_$',
            argsIgnorePattern: '^(?!__)_.*|^_$',
            caughtErrorsIgnorePattern: '^(?!__)_.*|^_$',
            destructuredArrayIgnorePattern: '^(?!__)_.*|^_$',
          },
        ],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': [
          'error',
          {allowDefaultCaseForExhaustiveSwitch: false},
        ],
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'warn', // TODO: enable
        '@typescript-eslint/restrict-template-expressions': 'warn', // TODO: enable
        '@typescript-eslint/restrict-plus-operands': 'warn', // TODO: enable
      },
    }),
  ]
}

function getTestConfigs() {
  return [
    ...applyTo.test('testing/no-only-tests', {
      plugins: {
        'no-only-tests': pluginNoOnlyTests,
      },
      rules: {
        'no-only-tests/no-only-tests': 'error',
      },
    }),
  ]
}

function getVitestConfigs() {
  return [
    ...applyTo.test('testing/vitest', {
      plugins: {
        vitest: pluginVitest,
      },
      rules: {
        ...pluginVitest.configs.all.rules,
        'vitest/prefer-to-be-truthy': 'off',
        'vitest/prefer-to-be-falsy': 'off',
      },
      settings: {
        vitest: {
          typecheck: true,
        },
      },
      languageOptions: {
        globals: {
          ...pluginVitest.environments.env.globals,
          // pluginVitest.environments.env.globals lack some of the globals, see https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/constants.ts
          chai: true,
          expectTypeOf: true,
          assertType: true,
          onTestFinished: true,
          onTestFailed: true,
        },
      },
    }),
    ...applyTo.test(
      'testing/vitest/formatting',
      flatCompat.extends('plugin:jest-formatting/strict'),
    ),
  ]
}

//------------------------------------------------------------------------------

export default tsEslint.config(
  ...getIgnoreConfigs(),
  ...getCoreConfigs(),
  ...getJsonConfigs(),
  ...getTypescriptConfigs(),
  ...getTestConfigs(),
  ...getVitestConfigs(),
  ...applyTo.all('settings', {
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        ...globals.worker,
        ...globals.serviceworker,
        ...globals.webextensions,
      },
    },
  }),
  ...applyTo.all('prettier', pluginPrettierRecommended), // always the last
)
