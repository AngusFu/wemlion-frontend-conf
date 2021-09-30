# `babel-plugin-library-aliases`

## 使用方法

[Online Demo](https://astexplorer.net/#/gist/d8677b464cdd083422ed42fad30f9d15/1ef806213e0ec146da38e841c1f9213ffc9e81ea)

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
        world: 'src/components/world#default',
        default: 'src/components/x#Comp'
      },
      ignore(imported, local) {
        // imported 可能为 null （import default 的情况）
        return local.name.startsWith('Original');
      }
    }
  }
];
```
