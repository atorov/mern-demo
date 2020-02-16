const path = require('path')
const webpack = require('webpack')

const Autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pkg = require('./package.json')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8080

const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const EXTERNALS = path.resolve(__dirname, 'src/frontend/assets/externals')
const STORAGE = path.resolve(__dirname, '__storage__')
const EXCLUDE_DEFAULT = [NODE_MODULES, EXTERNALS, STORAGE]

const SRC = path.resolve(__dirname, 'src/frontend')
const DIST = path.resolve(__dirname, 'build/www/mern-demo')

const NODE_ENV = process.env.NODE_ENV
const MODE = NODE_ENV !== 'development' ? 'production' : 'development'
process.env.BABEL_ENV = MODE

const APP_NAME = JSON.stringify(pkg.name).replace(/['"]+/g, '')
const APP_VERSION = JSON.stringify(pkg.version)
const ASSET_BASE_URL = JSON.stringify(MODE !== 'development' ? 'TODO:' : 'http://localhost:5000').replace(/"/g, '')
const BACKEND_API_BASE_URL = JSON.stringify(MODE !== 'development' ? 'TODO:' : 'http://localhost:5000/api').replace(/"/g, '')

const config = {
    mode: MODE,

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },

    entry: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        'whatwg-fetch',
        SRC,
    ],

    output: {
        path: DIST,
        publicPath: '/mern-demo/',
    },

    devtool: 'source-map',

    performance: {
        maxEntrypointSize: MODE === 'production' ? 1000000 : 5000000,
        maxAssetSize: MODE === 'production' ? 1000000 : 5000000,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: (() => {
                    if (MODE === 'development') {
                        return [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => ([Autoprefixer]),
                                },
                            },
                        ]
                    }

                    return [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([Autoprefixer]),
                            },
                        },
                    ]
                })(),
            },
            {
                test: /\.less$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: (() => {
                    if (MODE === 'development') {
                        return [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => ([Autoprefixer]),
                                },
                            },
                            'less-loader',
                        ]
                    }

                    return [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([Autoprefixer]),
                            },
                        },
                        'less-loader',
                    ]
                })(),
            },
            {
                test: /\.scss$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: (() => {
                    if (MODE === 'development') {
                        return [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => ([Autoprefixer]),
                                },
                            },
                            'sass-loader',
                        ]
                    }

                    return [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([Autoprefixer]),
                            },
                        },
                        'sass-loader',
                    ]
                })(),
            },
            {
                test: /\.jsx?$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins: [
        new webpack.WatchIgnorePlugin(EXCLUDE_DEFAULT),

        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(APP_NAME),
            APP_VERSION: JSON.stringify(APP_VERSION),
            ASSET_BASE_URL: JSON.stringify(ASSET_BASE_URL),
            BACKEND_API_BASE_URL: JSON.stringify(BACKEND_API_BASE_URL),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV),
        }),

        new HtmlWebpackPlugin({
            filename: DIST + '/index.html',
            template: SRC + '/index.ejs',
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:4].css',
        }),

        new CopyWebpackPlugin(
            [
                {
                    from: SRC + '/assets/img/favicon.png',
                    to: DIST + '/favicon.png',
                },
                {
                    from: SRC + '/assets/img',
                    to: DIST + '/img',
                },
                {
                    from: SRC + '/assets/xdata',
                    to: DIST + '/xdata',
                },
            ],
            {
                ignore: ['.DS_Store'],
            },
        ),
    ],
}

// Production mode only settings -----------------------------------------------
if (MODE === 'production') {
    config.output.chunkFilename = '[name].[chunkhash:4].js'
    config.output.filename = '[name].[chunkhash:4].js'

    config.optimization = {
        splitChunks: {
            chunks: 'initial',
        },
        runtimeChunk: {
            name: 'manifest',
        },
    }
}

// Development mode only settings ----------------------------------------------
if (MODE === 'development') {
    config.devServer = {
        host: HOST,
        port: PORT,
        publicPath: '/mern-demo/',
        historyApiFallback: {
            index: '/mern-demo/index.html',
        },
        disableHostCheck: true,
        stats: 'errors-only',
        overlay: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: EXCLUDE_DEFAULT,
        },
    }
}

module.exports = config
