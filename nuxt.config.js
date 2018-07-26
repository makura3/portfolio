const StylelintPlugin = require('stylelint-webpack-plugin')

const title = 'まくらのカバー'

const meta = [
  { charset: 'utf-8' },
  { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { hid: 'description', name: 'description', content: 'カバーっぽい何か' },
  { hid: 'itempropName', itemprop: 'name', content: title },
  { hid: 'itempropDesc', itemprop: 'description', content: 'カバーっぽい何か' }
]

module.exports = {
  srcDir: 'src/',
  head: {
    title,
    meta,
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: 'body'
    }
  },
  build: {
    vendor: ['~/assets/js/canvas.js'],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.plugins.push(
          new StylelintPlugin({
            files: ['**/*.vue']
          })
        )
      }
    }
  },
  modules: [
    ['nuxt-sass-resources-loader', ['@/assets/scss/variable.scss']],
    ['@nuxtjs/font-awesome']
  ],
  css: [
    //cssがあればここに
    'sanitize.css',
    '@/assets/scss/default.scss',
    '@/assets/scss/animation.scss'
  ],
  plugins: [{ src: '~/plugins/firebaseInit' }]
}
