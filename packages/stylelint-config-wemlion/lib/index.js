module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-rational-order'
  ],

  plugins: ['stylelint-order', 'stylelint-config-rational-order/plugin'],

  rules: {
    'declaration-empty-line-before': null,

    'order/properties-alphabetical-order': null,
    'order/properties-order': [[], { severity: 'error' }],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': true,
        'empty-line-between-groups': true,
        severity: 'error'
      }
    ],

    'max-nesting-depth': [
      2,
      {
        ignore: ['blockless-at-rules', 'pseudo-classes']
      }
    ],

    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],

    'color-hex-case': 'lower',
    'value-keyword-case': null
  }
};
