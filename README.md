# Website - Docusaurus Project

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Tailwind CSS

要在 Docusaurus 项目中使用 Tailwind CSS，你可以按照以下步骤进行设置：

1. 安装 Tailwind CSS：首先，在你的 Docusaurus 项目根目录下运行以下命令来安装 Tailwind CSS 和相关依赖：
   ```
   npm install tailwindcss@latest postcss@latest autoprefixer@latest
   ```

2. 创建配置文件：在你的项目根目录下创建一个 `postcss.config.js` 文件，并将以下内容添加到文件中：
   ```javascript
   module.exports = {
     plugins: [
       require('tailwindcss'),
       require('autoprefixer'),
     ],
   };
   ```

3. 配置样式表：打开 `docusaurus.config.js` 文件，并找到名为 `stylesheets` 的数组。将 `'src/css/custom.css'` 添加到数组中，确保它是第一个元素。这样可以确保自定义样式优先于其他样式加载。
   
4. 创建自定义样式表：在 `src/css/` 目录下创建一个名为 `custom.css` 的文件，并添加以下内容作为示例基础代码：
    ```css
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';

    /* 在此处添加任何额外的自定义CSS规则或覆盖Tailwind CSS默认值 */
    ```

5. 构建并启动服务器：使用以下命令重新构建和启动 Docusaurus 本地服务器：
    ```
    npx docusaurus build && npx docusaurus start
    ```

现在，你可以在 Docusaurus 项目中使用 Tailwind CSS。在 `custom.css` 文件中添加自定义的 CSS 规则或覆盖默认值，并将其应用到你的页面和组件上。

