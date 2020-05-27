module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/tbk-qianqian/dist/'
        : '/',
    devServer: {
        port: '2278',
        proxy: {
            '/api': {    //将www.example.com映射为/api
                target: 'https://gateway.kouss.com/tbpub',  // 接口域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''   //需要rewrite的,
                }
            }
        }
    },
    lintOnSave: false,  //关闭内置Eslint检查
    // 以下是pwa配置
    pwa: {
        iconPaths: {
            favicon32     : 'favicon.ico',
            favicon16     : 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon      : 'favicon.ico',
            msTileImage   : 'favicon.ico'
        }
    },
}