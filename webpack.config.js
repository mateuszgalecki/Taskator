const path = require("path");
const Html = require('html-webpack-plugin');
const MiniCSS = require('mini-css-extract-plugin');
const Compression = require('compression-webpack-plugin');
const Clean = require('clean-webpack-plugin');

module.exports = function (env) {
    const config = {};

    const isDev = env.dev ? true : false;
    const isProd = env.prod ? true : false;

    config.entry = "./src/index.js";
    config.output = {
        filename: isDev
            ? "[name].js"
            : "[name].[chunkhash].js",
        path: path.resolve(__dirname, "build")
    }

    config.mode = isProd
        ? "production"
        : "development";

    config.devtool = isProd
        ? false
        : "source-map";

    config.module = {};
    config.module.rules = [];

    const browsers = {
        dev: ['Chrome > 60'],
        prod: ['> 3%']
    }

    const js = {
        test: /\.js$/, exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['env', {
                        targets: {
                            browsers: isDev
                                ? browsers.dev
                                : browsers.prod
                        }
                    }]
                ],
                plugins: [
                    'syntax-dynamic-import'
                ]
            }
        }
    }
    config.module.rules.push(js);

    const scss = {
        test: /\.scss$/,
        use: [
            isProd
                ? MiniCSS.loader
                : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isProd ? false : true,
                    minimize: isProd ? true : false
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [
                        new require('autoprefixer')({
                            browsers: isProd
                                ? browsers.prod : browsers.dev
                        })
                    ]
                }
            },
            'sass-loader'
        ]
    }

    config.module.rules.push(scss);

    const images = {
        test: /\.(jpg|jpeg|gif|png|csv)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: isProd
                    ? '[name].[hash].[ext]'
                    : '[name].[ext]',
                publicPath: 'images',
                outputPath: 'images'
            }
        }
    }

    config.module.rules.push(images);

    const fonts = {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: isProd
                    ? '[name].[hash].[ext]'
                    : '[name].[ext]',
                publicPath: 'fonts',
                outputPath: 'fonts'
            }
        }
    }

    config.module.rules.push(fonts);

    config.plugins = [];

    config.plugins.push(
        new Html({
            filename: 'index.html',
            template: './src/index.html',
            minify: false
        })
    );

    if (isProd) {
        config.plugins.push(new MiniCSS(
            {filename: 'app.[chunkhash].css'})
        );

        config.plugins.push(
            new Compression({
                threshold: 0,
                minRatio: 0.8
            })
        );

        config.plugins.push(
            new Clean(['build'])
        );
    }

    if (isDev) {
        config.devServer = {
            port: 8080,
            progress: true,
            overlay: true,
        }
    }

    return config;
}


// const HtmlWebPackPlugin = require("html-webpack-plugin");
// // const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader"
//                 }
//             },
//             {
//                 test: /\.html$/,
//                 use: [
//                     {
//                         loader: "html-loader"
//                     }
//                 ]
//             },
//             {
//                 test: /\.(jpg|png|gif|svg|pdf|ico)$/,
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name: '[name]-[hash:8].[ext]',
//                             outputPath: 'assets/images/',
//                             useRelativePaths: true
//                         }
//                     }
//                 ]
//             },
//             // {
//             //     test: /\.(scss|css)$/,
//             //     use: [
//             //         MiniCssExtractPlugin.loader,
//             //         {
//             //             loader: "css-loader",
//             //             options: {
//             //                 sourceMap: true,
//             //                 minimize: {
//             //                     safe: true
//             //                 }
//             //             }
//             //         },
//             //         {
//             //             loader: "postcss-loader",
//             //             options: {
//             //                 autoprefixer: {
//             //                     browsers: ["last 2 versions"]
//             //                 },
//             //                 plugins: () => [
//             //                     require('autoprefixer')
//             //                 ]
//             //             },
//             //         },
//             //         {
//             //             loader: "resolve-url-loader"
//             //         },
//             //         {
//             //             loader: "sass-loader",
//             //             options: {
//             //                 sourceMap: true
//             //             }
//             //         }
//             //     ]
//             // }
//             {
//                 test: /\.scss$/,
//                 exclude: /node_modules/,
//                 use: ExtractTextPlugin.extract({
//                     fallback: 'style-loader',
//                     use: [
//                         {
//                             loader: 'css-loader',
//                             options: {
//                                 url: true,
//                                 minimize: true,
//                                 sourceMap: true
//                             }
//                         },
//                         {
//                             loader: "postcss-loader",
//                             options: {
//                                 autoprefixer: {
//                                     browsers: ["last 2 versions"]
//                                 },
//                                 plugins: () => [
//                                     require('autoprefixer')
//                                 ]
//                             },
//                         },
//                         {
//                             loader: 'sass-loader',
//                             options: {
//                                 sourceMap: true
//                             }
//                         }
//                     ]
//                 })
//             }
//         ]
//     },
//     mode: "production",
//     plugins: [
//         new HtmlWebPackPlugin({
//             template: "./src/index.html",
//             filename: "./index.html"
//         }),
//         // new MiniCssExtractPlugin({
//         //     filename: `css/[name].css`
//         // })
//         new ExtractTextPlugin('css/style.css')
//     ]
// };
