# antd-theme
自定义antd3.x的主题样式

## Install

```bash
$ npm install base-antd-theme
```

## Usage

```js
import AntdTheme from 'base-antd-theme';

// webpack.config.js: less-loader
{
  loader: 'less-loader',
  options: {
    modifyVars: AntdTheme,
  },
},
```
