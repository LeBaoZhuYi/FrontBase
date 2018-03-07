import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import commonConfig from './webpack.common.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { root } from './utils'



export default webpackMerge(commonConfig, {

    output: {
        path: root('dist'),
        publicPath: 'dist/',
        filename: '[chunkhash:8].js',
        chunkFilename: '[chunkhash:8].chunk.js'
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], { root: root('') }),

        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(process.env.ENV)
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        }),
    ]
})
