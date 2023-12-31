// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  // headTags:[
  //   {
  //     tagName: 'link',
  //     attributes: {
  //       rel: 'stylesheet',
  //       href: 'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/lib/codemirror.css',
  //     },
  //   },
  // ],
  stylesheets: [
    // 'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/lib/codemirror.css',
  ],
  scripts: [
    // 'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/lib/codemirror.js',
    // 'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/addon/selection/active-line.js',
    // 'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/mode/javascript/javascript.js',
  ],
  plugins: [
    '@docusaurus/theme-live-codeblock',
    './my-plugin',
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-hans',
    locales: ['zh-hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: '/edit#',
          
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: '/edit#',

        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'archive',
            position: 'left',
            label: 'Archive',
          },
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },

          
          // { to: '/docs', label: 'Docs', position: 'left' },
        
          { to: '/blog', label: 'Blog', position: 'left' },
          // {
          //   type: 'doc',
          //   position: 'left',
          //   docId: 'some',
          //   label: 'Some',
          // },
          // {
          //   type: 'dropdown',
          //   label: '+',
          //   position: 'right',
          //   items: [
          //     {
          //       type: 'doc',
          //       label: 'some',
          //       docId: 'some',
          //     },
          //     // ... more items
          //   ],
          // },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
          // { to: '/docs/some', label: 'Some', position: 'left' },
   
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Manual',
            items: [
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/docs/category/guides',
              },
              {
                label: 'Axios',
                href: 'https://axios-http.com/zh/docs/api_intro',
              },
              {
                label: 'Express',
                href: 'http://expressjs.com/zh-cn/guide/routing.html',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom',
      },
    }),
};

module.exports = config;
