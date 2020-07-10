const RuleTester = require('eslint').RuleTester;
const rule = require('./no-unnecessary-template-literals');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 } }); // You do have to tell eslint what js you're using

ruleTester.run('no-unnecessary-template-literals', rule, {
  valid: ['const a = "123";', 'const a = `1\n2\n3`;'],
  invalid: [
    {
      code: 'const a = `123`;',
      output: `const a = '123';`,
      errors: [
        {
          messageId: 'UnnecessaryTemplateLiteral',
          line: 1,
          nodeType: 'Block'
        }
      ]
    }
  ]
});
