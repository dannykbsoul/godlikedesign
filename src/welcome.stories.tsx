import React from 'react';
import { storiesOf } from '@storybook/react';

const markdownText = `
### 使用 React+typescript 实现属于自己的组件库

### 安装试试

~~~javascript
npm install godlikedesign --save
~~~


### 使用

~~~javascript
// 加载样式
import 'godlikedesign/dist/index.css'
// 引入组件
import { Button } from 'godlikedesign'
~~~
`;
storiesOf('欢迎来到godlikedesign', module).add(
  'welcome',
  () => {
    return <h2>欢迎来到 godlikedesign 组件库</h2>;
  },
  { info: { text: markdownText, source: false } }
);
