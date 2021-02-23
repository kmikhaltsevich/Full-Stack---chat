export default {
  target: 'server',
  server: {
    port: 3000,
    host: 'localhost'
  },
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' }
  ],
  plugins: [
    { src: '@/plugins/socket', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  axios: {},
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    optionsPath: './plugins/vuetify.options.js',
    treeShake: true
  },
  build: {}
}
