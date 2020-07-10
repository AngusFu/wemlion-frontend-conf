module.exports = {
  extends: ['plugin:prettier/recommended', 'react-app'],
  plugins: ['babel', 'wemlion'],
  rules: {
    'wemlion/no-unnecessary-template-literals': [
      'error',
      {
        singleQuote: true
      }
    ],
    'wemlion/check-data-table-row-key': 'warn',
    'wemlion/top-level-styled-components': 'error',

    'prettier/prettier': 'error',
    'getter-return': 'error',
    'no-await-in-loop': 'error',
    'no-return-await': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-template-curly-in-string': 'warn',
    'array-callback-return': 'warn',
    'class-methods-use-this': 'warn',
    complexity: ['error', 20],
    'default-case': 'warn',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'warn',
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-else-return': 'warn',
    'no-empty-function': 'warn',
    'no-implicit-coercion': 'warn',
    'no-implicit-globals': 'warn',
    'no-loop-func': 'warn',
    /*
    'no-magic-numbers': [
      'off',
      {
        // ignore: [-1, 0, 1, 2, 200, 401, 403, 404, 500],
        ignoreArrayIndexes: true
      }
    ],
    */
    'no-unused-vars': 'error',
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error',
    'no-param-reassign': 'error',
    'no-script-url': 'error',
    'no-useless-concat': 'warn',
    'no-useless-return': 'error',
    'require-await': 'warn',
    'no-undefined': 'error',
    'max-depth': ['error', 4],
    'max-len': [
      'warn',
      {
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignorePattern: '^import\\s'
      }
    ],
    'max-lines': ['error', 600],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 4],
    'max-statements': ['error', 100],
    'multiline-ternary': ['warn', 'always-multiline'],
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'nonblock-statement-body-position': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'error',
    'prefer-template': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'newline-before-return': 'error',
    'react/jsx-no-useless-fragment': 'error'
  }
};
