module.exports = {
  extends: ['stylelint-config-wemlion', 'stylelint-config-styled-components'],
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        moduleName: 'styled-components',
        importName: 'default',
        strict: false,
        ignoreFiles: [],
        parserPlugins: [
          'jsx',
          'objectRestSpread',
          ['decorators', { decoratorsBeforeExport: true }],
          'classProperties',
          'exportExtensions',
          'asyncGenerators',
          'functionBind',
          'functionSent',
          'dynamicImport',
          'optionalCatchBinding',
          'optionalChaining',
          // 本行之前的全部是默认值
          'nullishCoalescingOperator'
        ]
      }
    ]
  ]
};
