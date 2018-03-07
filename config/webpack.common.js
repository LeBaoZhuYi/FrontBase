import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { loader, hash, root } from './utils'


const globalExtract = new ExtractTextPlugin(hash('global.css'))
const uiExtract = new ExtractTextPlugin(hash('ui.css'))
const appExtract = new ExtractTextPlugin(hash('app.css'))


export default {
    entry: {
        lib: ['vue'],
        app: './src/app/app.js',
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'prettier-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'url-loader',
            },
            
            loader(globalExtract, /\global.scss$/, true),
            loader(uiExtract, /\iview.css$/),
            loader(appExtract, /^((?!global).)*\.scss$/, true),
        ]
    },

    plugins: [
        globalExtract,
        uiExtract,
        appExtract,
    ]
}
