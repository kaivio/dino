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
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/lib/codemirror.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/3024-day.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/3024-night.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/abbott.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/abcdef.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/ambiance.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/ambiance-mobile.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/ayu-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/ayu-mirage.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/base16-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/base16-light.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/bespin.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/blackboard.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/cobalt.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/colorforth.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/darcula.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/dracula.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/duotone-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/duotone-light.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/eclipse.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/elegant.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/erlang-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/gruvbox-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/hopscotch.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/icecoder.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/idea.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/isotope.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/juejin.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/lesser-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/liquibyte.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/lucario.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/material.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/material-darker.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/material-ocean.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/material-palenight.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/mbo.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/mdn-like.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/midnight.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/monokai.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/moxer.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/neat.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/neo.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/night.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/nord.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/oceanic-next.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/panda-syntax.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/paraiso-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/paraiso-light.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/pastel-on-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/railscasts.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/rubyblue.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/seti.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/shadowfox.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/solarized.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/ssms.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/the-matrix.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/tomorrow-night-bright.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/tomorrow-night-eighties.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/ttcn.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/twilight.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/vibrant-ink.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/xq-dark.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/xq-light.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/yeti.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/yonce.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/theme/zenburn.css',
  ],
  scripts: [
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/lib/codemirror.js',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/addon/selection/active-line.js',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.14/mode/javascript/javascript.js',
  ],
  plugins: [
    '@docusaurus/theme-live-codeblock',
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

  onBrokenLinks: 'throw',
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
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
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
