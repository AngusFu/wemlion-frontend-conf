const { getUpperFunction } = require('eslint/lib/rules/utils/ast-utils.js');

module.exports = {
  meta: {
    fixable: false,
    docs: {
      description: '不允许非顶级的 styled 调用',
      category: 'Stylistic Issues',
      recommended: true
    }
  },

  create(context) {
    return {
      TaggedTemplateExpression(node) {
        const { tag } = node;

        if (tag.type === 'MemberExpression' && tag.object.name === 'styled' ||
          tag.type === 'CallExpression' && tag.callee.name === 'styled') {

          if (getUpperFunction(node)) {
            context.report({
              node,
              message: '只允许 top level 的 styled 调用'
            });
          }
        }
      },
    }
  }
};
