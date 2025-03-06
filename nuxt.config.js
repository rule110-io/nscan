import pkg from './package'
require('dotenv').config()

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | nScan.io - the official NKN explorer',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'content-type',
        content: 'text/html'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'msapplication-TileColor', content: '#0b163c' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'og:title', content: 'nScan.io - The official NKN Explorer' },
      {
        name: 'og:description',
        content:
          'nScan is the official NKN mainnet explorer. With it you can easily discover all blocks, transactions and addresses at one place.'
      },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: '/' },
      { name: 'og:image', content: 'https://nscan.io/thumbnail.jpg' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@rule110_io' },
      { name: 'twitter:title', content: 'nScan.io - The official NKN Explorer' },
      {
        name: 'twitter:description',
        content:
          'nScan is the official NKN mainnet explorer. With it you can easily discover all blocks, transactions and addresses at one place.'
      },
      {
        name: 'twitter:image',
        content: 'https://nscan.io/thumbnail.jpg'
      },
      { name: 'twitter:image:alt', content: 'nScan logo' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      }
    ],
    script: [
      {
        hid: 'google-analytics',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-16JQ6K5NP0',
        async: true
      },
      {
        hid: 'google-analytics-inline',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-16JQ6K5NP0', { 'anonymize_ip': true });
        `,
        type: 'text/javascript'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/reset.css',
    '@/assets/scss/main.scss',
    '~/assets/css/feather.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters.js',
    '~plugins/i18n.js',
    '~plugins/pusher.js',
    '~plugins/moment.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/moment',
      {
        locales: [
          'de',
          'ru',
          'fr',
          'tr',
          'es',
          'nl',
          'hu',
          'ja',
          'fi',
          'vi',
          'sk',
          'zh-cn'
        ],
        defaultLocale: 'en'
      }
    ],
    'nuxt-clipboard2',
    'nuxt-mq',

    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'en',
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            flag: 'us',
            file: 'en-US.js'
          },
          {
            name: 'Deutsch',
            code: 'de',
            iso: 'de-DE',
            flag: 'de',
            file: 'de-DE.js'
          },
          {
            name: 'Русский',
            code: 'ru',
            iso: 'ru-RU',
            flag: 'ru',
            file: 'ru-RU.js'
          },
          {
            name: 'Nederlands',
            code: 'nl',
            iso: 'nl-NL',
            flag: 'nl',
            file: 'nl-NL.js'
          },
          {
            name: 'Français',
            code: 'fr',
            iso: 'fr-FR',
            flag: 'fr',
            file: 'fr-FR.js'
          },
          {
            name: 'Magyar',
            code: 'hu',
            iso: 'hu-HU',
            flag: 'hu',
            file: 'hu-HU.js'
          },
          {
            name: 'Türkçe',
            code: 'tr',
            iso: 'tr-TR',
            flag: 'tr',
            file: 'tr-TR.js'
          },
          {
            name: 'Español',
            code: 'es',
            iso: 'es-ES',
            flag: 'es',
            file: 'es-ES.js'
          },
          {
            name: 'Slovenčina',
            code: 'sk',
            iso: 'sk-SK',
            flag: 'sk',
            file: 'sk-SK.js'
          },
          {
            name: 'Suomi',
            code: 'fi',
            iso: 'fi-FI',
            flag: 'fi',
            file: 'fi-FI.js'
          },
          {
            name: 'Tiếng Việt',
            code: 'vi',
            iso: 'vi-VI',
            flag: 'vn',
            file: 'vi-VI.js'
          },
          {
            name: '日本語',
            code: 'ja',
            iso: 'ja-JA',
            flag: 'jp',
            file: 'ja-JA.js'
          },
          {
            name: '中文',
            code: 'zh',
            iso: 'zh-CN',
            flag: 'cn',
            file: 'zh-CN.js'
          }
        ],
        lazy: true,
        langDir: 'lang/'
      }
    ]
  ],
  /*
   ** Style Resources module configuration
   */
  styleResources: {
    scss: [
      '~/assets/scss/_app.variables.scss',
      '~/assets/scss/_app.mixins.scss'
    ]
  },
  mq: {
    defaultBreakpoint: 'default',
    breakpoints: {
      sm: 320,
      md: 1200,
      lg: Infinity
    }
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://openapi.nkn.org/api/v1/'
  },

  /*
   ** Build configuration
   */
  buildModules: [
    // Simple usage
    '@nuxtjs/stylelint-module'
  ],
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['comma-number'],

    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
