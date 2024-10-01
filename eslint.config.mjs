import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser' // Nhập parser
import eslintPluginReact from 'eslint-plugin-react' // Nhập plugin react
import eslintPluginPrettier from 'eslint-plugin-prettier' // Nhập plugin prettier

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsparser, // Sử dụng parser TypeScript
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint, // Định nghĩa plugin @typescript-eslint
      react: eslintPluginReact, // Sử dụng đối tượng plugin react
      prettier: eslintPluginPrettier, // Sử dụng đối tượng plugin prettier
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': 'warn',
      'no-debugger': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: ['plugin:jest/recommended'],
  },
  pluginJs.configs.recommended,
]
