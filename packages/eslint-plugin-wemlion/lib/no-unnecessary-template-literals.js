module.exports = {
  meta: {
    fixable: true,
    docs: {
      description: 'Do not use unnecessary template literals',
      category: 'Stylistic Issues',
      recommended: true
    },
    messages: {
      UnnecessaryTemplateLiteral: 'Unnecessary template literal'
    }
  },

  create(context) {
    const { options } = context;
    const { singleQuote = true } = Object.assign({}, options[0]);

    return {
      TemplateLiteral(node) {
        const { expressions, quasis } = node;

        if (expressions.length === 0 && quasis.length === 1) {
          const str = quasis[0].value.raw;

          if (/["'\n]/.test(str) === false) {
            context.report({
              node,
              messageId: 'UnnecessaryTemplateLiteral',
              fix(fixer) {
                return fixer.replaceText(
                  node,
                  singleQuote ? `'${str}'` : JSON.stringify(str)
                );
              }
            });
          }
        }
      }
    };
  }
};
