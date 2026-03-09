import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 1. 모든 파일에 대해 fetch 호출 금지 규칙 추가
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='fetch']",
          message:
            '직접적인 fetch 호출은 금지됩니다. @/utils/customFetch 를 활용하세요. - ldb',
        },
      ],
    },
  },

  // 2. customFetch.ts 파일에서만 해당 규칙 예외 처리
  {
    files: ['**/customFetch.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
