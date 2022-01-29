module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
        name: 'Plant Buddy',
        themeColor: '#3b8686',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        manifestOptions: {
            short_name: 'PB',
            display: 'standalone',
            start_url: '.'
        }
    }
}
