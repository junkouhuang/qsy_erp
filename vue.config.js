const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    lintOnSave: false,
    publicPath: '/',
    productionSourceMap: false,
    // 生产环境自动清除console
    configureWebpack: config => {
      config
        .optimization = {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        }
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
    css: {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    // baseUrl: './',
    // devServer: {
    // //   open: process.platform === 'darwin',
    //   // host: 'localhost:8080',
    // //   // host: 'peng.vkrms.vanke.com',
    //   port: 8080,
    // //   https: false,
    // //   hotOnly: false,
    //   proxy: {
    //     '/': {
    //       target: 'http://192.168.10.14:9259/',
    // //       // target: 'http://peng.vkrms.vanke.com:8080',
    //       // ws: false,
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '/': ''
    //       },
    // //       changeOrigin: true
    //     }
    //   }
    // }
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, 'src/styles/variable.less'), // 需要全局导入的less
                path.resolve(__dirname, 'src/styles/mixin.less'),
            ],
        })
}