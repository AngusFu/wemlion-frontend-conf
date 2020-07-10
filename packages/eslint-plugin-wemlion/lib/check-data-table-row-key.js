// TODO 添加测试用例
const t = require('@babel/core').types;

module.exports = {
  meta: {
    fixable: true,
    docs: {
      description: '检查 DataTable 组件的 rowKey',
      category: 'Stylistic Issues',
      recommended: true
    },
    messages: {
      NoRowKey: '没有使用 rowKey',
      WrongUsage: 'useDataTable 和 DataTable 需要配合使用',
      InvalidRowKey:
        '直接使用 inline 的 string 或 function 作为 rowKey，不要使用表达式',
      UnnecessaryArrowFunction: 'rowKey 不必要使用简单箭头函数'
    }
  },

  create(context) {
    let wrongUsageReported = false;
    let hasDataTable = false;
    let hasUseDataTable = false;

    return {
      ImportSpecifier(node) {
        const { name } = node.imported;

        if (name === 'DataTable') {
          hasDataTable = true;

          return;
        }

        if (name === 'useDataTable') {
          hasUseDataTable = true;
        }
      },

      JSXOpeningElement(node) {
        if (
          t.isJSXIdentifier(node.name) === false ||
          node.name.name !== 'DataTable'
        ) {
          return;
        }

        if (
          process.env.NODE_ENV === 'development' &&
          hasDataTable !== hasUseDataTable &&
          wrongUsageReported === false
        ) {
          context.report({
            node,
            messageId: 'WrongUsage'
          });

          wrongUsageReported = true;

          return;
        }

        if (!hasDataTable) {
          return;
        }

        const rk = node.attributes.find(attr => {
          return (
            t.isJSXAttribute(attr) &&
            t.isJSXIdentifier(attr.name) &&
            attr.name.name === 'rowKey'
          );
        });

        if (!rk) {
          context.report({
            node,
            messageId: 'NoRowKey',
            loc
          });

          return;
        }

        const { value } = rk;

        if (t.isJSXAttribute(rk) && value) {
          if (t.isJSXExpressionContainer(value)) {
            const { expression } = value;

            if (t.isFunctionExpression(expression)) {
              return;
            }

            if (t.isArrowFunctionExpression(expression)) {
              if (t.isIdentifier(expression.params[0])) {
                const rowName = expression.params[0].name;

                // case 1: (row) => row.uuid;
                if (t.isMemberExpression(expression.body)) {
                  const { object, property } = expression.body;

                  if (object.name === rowName && t.isIdentifier(property)) {
                    context.report({
                      node: value,
                      messageId: 'UnnecessaryArrowFunction',
                      fix(fixer) {
                        return fixer.replaceText(
                          value,
                          JSON.stringify(property.name)
                        );
                      }
                    });
                  }

                  return;
                }

                // case 2: (row) => `${row.id}`;
                if (t.isTemplateLiteral(expression.body)) {
                  if (expression.body.expressions.length === 1) {
                    const { object, property } = expression.body.expressions[0];

                    if (object.name === rowName && t.isIdentifier(property)) {
                      context.report({
                        node: value,
                        messageId: 'UnnecessaryArrowFunction',
                        fix(fixer) {
                          return fixer.replaceText(
                            value,
                            JSON.stringify(property.name)
                          );
                        }
                      });
                    }
                  }

                  return;
                }

                // case 3: (row) => String(row.id);
                if (t.isCallExpression(expression.body)) {
                  if (
                    expression.body.callee.name === 'String' &&
                    expression.body.arguments.length === 1 &&
                    t.isMemberExpression(expression.body.arguments[0])
                  ) {
                    const { object, property } = expression.body.arguments[0];

                    if (object.name === rowName && t.isIdentifier(property)) {
                      context.report({
                        node: value,
                        messageId: 'UnnecessaryArrowFunction',
                        fix(fixer) {
                          return fixer.replaceText(
                            value,
                            JSON.stringify(property.name)
                          );
                        }
                      });
                    }
                  }

                  return;
                }

                return;
              }
            }

            context.report({
              node,
              messageId: 'InvalidRowKey'
            });
          } else if (t.isLiteral(value) === false) {
            context.report({
              node,
              message: 'InvalidRowKey'
            });
          }
        }
      }
    };
  }
};
