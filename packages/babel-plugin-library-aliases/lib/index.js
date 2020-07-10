/** @typedef {import('@babel/core')} BabelObj */

/** @type {(babel: BabelObj) => import('@babel/core').PluginObj} */
module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-library-aliases',
    visitor: {
      ImportDeclaration(path, state) {
        const { node } = path;

        const opts = state.opts || {};
        const libraries = Object.keys(opts);

        if (libraries.includes(node.source.value) === false) return;

        const config = opts[node.source.value];
        const components = Object.keys(config.aliases);
        const specifiers = node.specifiers.filter(
          s =>
            t.isImportSpecifier(s) &&
            components.some(
              name =>
                s.imported.name === name &&
                config.ignore(s.imported, s.local) === false
            )
        );

        const imports = [];

        specifiers.forEach(specifier => {
          if (specifier && t.isImportSpecifier(specifier)) {
            // 目前只能应对 `import { A, B as b } from 'antd'` 这种情况
            // 下面两种 理论上也能应对 不过暂时不太想写
            // - `import antd from 'antd'`
            // - `import { default as AntDesign } from 'antd'`

            const importName = specifier.imported.name;
            const target = config.aliases[importName];
            const [source, name] = target.split('#');

            imports.push(
              t.importDeclaration(
                [
                  t.importSpecifier(
                    specifier.local,

                    t.Identifier(name || importName)
                  )
                ],
                t.stringLiteral(source)
              )
            );

            node.specifiers = node.specifiers.filter(s => s !== specifier);
          }
        });

        if (imports.length) {
          path.insertAfter(imports);
        }

        if (node.specifiers.length < 1) {
          path.remove();
        }
      }
    }
  };
};
