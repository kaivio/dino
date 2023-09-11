---
title: 设计草稿
# sidebar_position: 1
---

<!-- JSX -->

export function Box(){
  return <div className='h-32 bg-gray-500 text-white'>test</div>
}

<!-- END JSX -->

## Routers

- [/edit/file#f=README.md](/edit/file#f=README.md&f=static/test.sh&f=static/test.java)  编辑文件
- [/edit#/docs/some.md](/edit#/docs/some.md)  编辑文档或博客
- [/paste](/paste)   剪切板
- [/test](/test) 测试页面
- [/blank](/blank) 无包装的测试页面



## Todo

- [X] **修改导航栏，添加文档页面的编辑入口**
- [ ] 制作一个按钮组件
  - [x] 基本按钮
  - [X] 图标按钮
  - [ ] 样式变体按钮
  - [ ] 状态按钮
- [ ] 优化编辑器
  - [x] 把按钮换成上面的的组件
  - [x] 工具视图显示开关
  - [ ] 本地缓存
  - [ ] 增加对话框或者特殊标签页实现交互(如错误报告、编辑器设置、资源管理)
  - [ ] 处理 tab 键
  - [ ] 移动端符号栏
  - [ ] 工具根据状态变化显示效果 (延后)
- [ ] /paste 页面：处理非图片类型的文件预览，状态可视化，移除文件
- [ ] 还有很多事情没做完

---
- [x] **bug** 构建出来的按钮没有激活特效，初步检查原因是tw没有生成bg-*的样式
  - 加了内联样式临时解决 

---
- [x] **Warning**  unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.
  
产生上述警告的原因是因为在渲染期间操作了dom
```jsx
setState((oldState) => {
  let newState = oldState + 1
  // 不要在这里操作dom！
  // highlight-next-line
  domWrite(newState)
  return newState
})
```

```jsx
let data  
flushSync(() => {
  setState((oldState) => {
    let newState = oldState + 1
    // highlight-start
    // 应该缓存要操作的数据
    data = newState
    // highlight-end
    return newState
  })
})

// 通过flushSync包装，保证状态更新完成后再操作dom
domWrite(data)
```

# Docs
- [tailwindcss](https://tailwindcss.com/docs/customizing-colors)


## Test

<Box />




























