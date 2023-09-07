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
- [x] **bug** 构建出来的按钮没有激活特效，初步检查原因是tw没有生成bg-*的样式
  - 加了内联样式临时解决 

---
- [ ] 制作一个按钮组件
  - [x] 基本按钮
  - [ ] 图标按钮
  - [ ] 样式变体按钮
  - [ ] 状态按钮
- [ ] 优化编辑器
  - [ ] 把按钮换成上面的的组件
  - [ ] 增加对话框或者特殊标签页实现交互(如错误报告、编辑器设置、资源管理)
  - [ ] 本地缓存
- [ ] /paste 页面：处理非图片类型的文件预览，状态可视化，移除文件
- [ ] 修改导航栏，添加文档页面的编辑入口
- [ ] 还有很多事情没做完
- [ ] process  unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.


# Docs
- [tailwindcss](https://tailwindcss.com/docs/customizing-colors)



## Test

<Box />















