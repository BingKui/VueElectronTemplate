const path = require('path');
const webpack = require('webpack');
const { dependencies } = require('../package.json');
// 插件
// eslit 友好格式化插件
const EslintFriendlyFormatter = require('eslint-friendly-formatter');
// html 插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// vue loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 文件 copy 插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// js压缩、优化插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 抽取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 打包进度条展示
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 优化输入信息插件
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');
// 清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 是否是正式环境
const isProd = process.env.ENV = 'prod';

const renderConfig = {
    target: 'electron-renderer',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: path.join(__dirname, '../src/index.js'),
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist/electron'),
        chunkFilename: '[id].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: EslintFriendlyFormatter,
                    },
                },
            },
            {
                test: /\.vue$/, // 处理vue模块
                use: [{
                    loader: 'vue-loader',
                    options: {
                        extractCSS: isProd,
                        loaders: {
                            less: 'vue-style-loader!css-loader!postcss-loader!less-loader',
                        },
                    },
                }],
            },
            {
                test: /\.js$/, //处理es6语法
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname,
                                '../src/styles/veriable.less'),
                        }
                    },
                ]
            },
            {
                test: /\.(js|vue)$/,
                enforce: 'pre', // 强制先进行 ESLint 检查
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 启用自动修复
                    fix: true,
                    // 启用警告信息
                    emitWarning: true,
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'img/[name]-[folder].[ext]'
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name]-[folder].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'fonts/[name]-[folder].[ext]'
                    }
                }
            },
        ],
    },
    resolve: { // 设置模块如何被解析
        alias: {
            '@components': path.resolve(__dirname, '../src/components'),
            '@styles': path.resolve(__dirname, '../src/styles'),
            '@store': path.resolve(__dirname, '../src/store'),
            '@router': path.resolve(__dirname, '../src/router'),
            '@assets': path.resolve(__dirname, '../src/assets/'),
            '@common': path.resolve(__dirname, '../src/common'),
            '@views': path.resolve(__dirname, '../src/views'),
            '@mock': path.resolve(__dirname, '../src/mock'),
            '@constants': path.resolve(__dirname, '../src/constants'),
        },
        extensions: ['*', '.less', '.css', '.js', '.vue']
    },
    optimization: {
        splitChunks: {
            maxInitialRequests: 5,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: -10,
                    enforce: true,
                },
                common: {
                    test: /[\\/]src[\\/](common|components)[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    priority: 20,
                },
            }
        },
        minimizer: [
            new UglifyJsPlugin({ // 压缩js
                uglifyOptions: {
                    compress: {
                        // warnings: false,
                        drop_debugger: false,
                        drop_console: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({ // 压缩css
                cssProcessorOptions: {
                    safe: true
                }
            })
        ]
    },
    node: {
        __dirname: process.env.ENV !== 'prod',
        __filename: process.env.ENV !== 'prod'
    },
    plugins: [
        new VueLoaderPlugin(),
        new ProgressBarPlugin(),
        new FirendlyErrorePlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist'),
            ignore: ['*.html']
        }, ]),
        new HTMLWebpackPlugin({
            title: 'VueElectronTemplate',
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.ejs'), // 模板文件，不同入口可以根据需要设置不同模板
            chunks: ['index', 'vendor', 'common'], // html文件中需要要引入的js模块，这里的 vendor 是webpack默认配置下抽离的公共模块的名称
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            dateTime: (new Date()).getTime(),
            nodeModules: process.env.ENV !== 'prod' ? path.resolve(__dirname, '../node_modules') : false,

        }),
        new MiniCssExtractPlugin({
            filename: isProd ? 'styles/[name].[hash:4].css' : 'styles/[name].[hash:8].css',
            chunkFilename: isProd ? 'styles/[name].[hash:4].css' : 'styles/[name].[hash:8].css'
        }),
        // 告诉 Webpack 使用了哪些动态链接库
        // new webpack.DllReferencePlugin({
        //     // 描述 vendor 动态链接库的文件内容
        //     manifest: require('./public/vendor/vendor.manifest.json')
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        port: 2333,
        historyApiFallback: true,
        overlay: { //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true,
            warnings: true,
        },
        inline: true,
        open: false,
        hot: true
    },
};

if (isProd) {
    renderConfig.devtool = '';
    renderConfig.plugins.unshift(
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin({
            // root: __dirname,
            verbose: true, //开启在控制台输出信息
            dry: false,
            beforeEmit: true, // 输出文件前清理干净
        }),
    );
    renderConfig.plugins.push(
        // new CopyWebpackPlugin([
        //     {
        //         from: path.join(__dirname, '../src/assets'),
        //         to: path.join(__dirname, '../dist/electron/assets'),
        //         ignore: ['.*']
        //     }
        // ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"prod"'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    );
} else {
    renderConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"dev"'
        }),
    );
}

module.exports = renderConfig;
