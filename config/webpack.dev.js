import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import commonConfig from './webpack.common.js'
import { root, order, getAdaptIP } from './utils'


const ip = process.env.ip && process.env.ip !== 'undefined' ? process.env.ip : getAdaptIP()
console.log(`Your adapt IP is ${ip}`)

const port = process.env.port && process.env.port !== 'undefined' ? process.env.port : 9000

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: root('dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunks: ['lib', 'app'],
            chunksSortMode: order,
        }),

    ],

    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        host: ip,
        port: 7070,
        inline: true,
        stats: 'minimal',
        proxy: {
            '/abs/*': {
                target: ``,
                onProxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('Cookie', 'JSESSIONID=' + process.env.jsessionid)
                },
                secure: false,
                changeOrigin: true,
                bypass: (req, res, proxyOptions) => {}
            },
        }
    }
})
