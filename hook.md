# hook使用
* 作用：在不使用class的情况下使用state以及其他的react特性
* 使用注意事项：1. 不能在class组件中使用
          2. react内置了一些像useState这样的hook，可以创建自己的hook来服用不同组建之间的
          状态逻辑
* hook使用规则：hook就是js函数，但使用他们会有两个额外的规则
1. 只能在函数最外层调用hook，不要在循环 条件判断或者子函数中调用
2. 只能在React的函数组件中调用hook
## useState使用
```
import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
* 在上面的这个例子中并没有使用state而是使用的useState来进行变量的声明以及赋值
* 可以在一个组件中多次使用State Hook

## Effect Hook
* 副作用：类似于在react组件中执行过数据获取、订阅或者手动修改DOM
* useEffect是Effect hook，给函数组件增加操作副作用的能力，跟class组件中的componentDidMount
componentDidUpdate  componentWillUnmount具有相同的用途，只不过被合并成了一个API

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
* 当在调用useEffect时，就是告诉组件在特定的时间去执行。

## 自定义hook
组件之间重用一些逻辑状态组件：两种主流方案来解决，高阶组件和render props 


