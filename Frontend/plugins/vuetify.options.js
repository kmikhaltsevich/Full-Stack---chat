import colors from 'vuetify/es5/util/colors'
export default {
  breakpoint: {
    // scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  icons: {
    iconfont: 'mdi',
  },
  lang: {},
  rtl: false,
  ltr : true,
  theme: {
    dark: true,
    options: {
      // cspNonce: undefined,
      // customProperties: undefined,
      // minifyTheme: undefined,
      // themeCache: undefined,
      variations: false
    },
    themes: {
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  }
}
