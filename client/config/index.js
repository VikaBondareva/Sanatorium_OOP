'use strict'

const path = require('path')

module.exports = {
  dev: {

      
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api/auth/*': { target: 'http://localhost:8081', ws: true },
        '/api/**': { target: 'http://localhost:8081', ws: true },
        '/wfrapps/logout': { target: 'http://localhost:8081', ws: true }
    },

    host: 'localhost', 
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,


    useEslint: true,

    showEslintErrorsInOverlay: false,


    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),

    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    bundleAnalyzerReport: process.env.npm_config_report
  }
}
