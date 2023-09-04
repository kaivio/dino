---
slug: welcome
title: Welcome
authors: [slorber, yangshun]
tags: [facebook, hello, docusaurus]
---

<!-- JSX -->



<!-- END JSX -->

[Docusaurus blogging features](https://docusaurus.io/docs/blog) are powered by the [blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).

Simply add Markdown files (or folders) to the `blog` directory.

Regular blog authors can be added to `authors.yml`.

The blog post date can be extracted from filenames, such as:

- `2019-05-30-welcome.md`
- `2019-05-30-welcome/index.md`

A blog post folder can be convenient to co-locate blog post images:

![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)

The blog supports tags as well!

**And if you don't want a blog**: just delete this directory, and use `blog: false` in your Docusaurus config.


在 `useEffect` 中，如果你返回一个函数，它将在组件卸载时执行清理工作。然而，如果异步函数返回一个 Promise，并不会影响到清理函数的执行。

以下是一个示例来说明这一点：

```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 异步操作示例（例如发起 API 请求）
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        
        // 在这里处理获取到的数据
        console.log(data);
      } catch (error) {
        // 处理错误情况
        console.error(error);
      }
    };

    const cleanup = () => {
      console.log('Cleanup function executed.');
    };

    fetchData();

    return cleanup;
  }, []);

  return <div>My Component</div>;
}
```

上述代码中，在 `useEffect` 的回调函数内部定义了名为 `fetchData` 和 `cleanup` 的两个函数。其中，`fetchData` 是异步函数用于执行某些异步操作。我们将其作为回调传递给 `useEffect` 来触发该效果。

同时，我们也定义了名为 `cleanup` 的普通同步函数，并通过返回它来指定在组件卸载时要执行的清理工作。

无论异步操作是否返回 Promise，在组件卸载时都会执行清理函数。因此，在上面的代码中，当组件被卸载时，“Cleanup function executed.” 将会被打印出来。

请注意，如果异步操作返回的 Promise 在组件卸载之前还未完成，清理函数可能会在该 Promise 完成后执行。这是因为 React 将等待所有挂起的异步操作（包括 Promises）完成后再执行清理函数。

总结起来，无论异步函数是否返回 Promise，在 `useEffect` 中指定的清理函数都将在组件卸载时执行。
