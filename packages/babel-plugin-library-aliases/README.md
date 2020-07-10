# `babel-plugin-library-aliases`

## 使用方法

[Online Demo](https://astexplorer.net/#/gist/44d95f68a6c130323005425722581376/)

```js
[
  'babel-plugin-library-aliases',
  {
    'lib-1': {
      aliases: {
        // 不支持相对路径
        // 你可以通过 webpack alias 来解决这类问题
        x: 'src/components/X',
        y: 'src/components/Y',
        z: 'src/components/Z#SomeNamedExport'
      },
      ignore(imported, local) {
        return /^[aA]ntd/.test(local.name);
      }
    },

    'lib-2': {
      aliases: {
        hello: 'src/components/new_lib',
        world: 'src/components/world#default'
      },
      ignore(imported, local) {
        return local.name.startsWith('Original');
      }
    }
  }
];
```

## 注意事项

目前只处理 `import { A, B as b } from 'lib'` 这种情况。

下面两种情况，暂不支持（够用即可）。

- `import lib from 'lib'`
- `import { default as Lib } from 'lib'`
