let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtraPlugin = require('mini-css-extract-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



let cssLoader = extra => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        'postcss-loader',
        'group-css-media-queries-loader'
    ]
    if(extra) loaders.push(extra)
    return loaders
}


module.exports = {
    // гаварим геде лежат все исходники нашего приложения 
    context : path.resolve(__dirname, 'src'),
    mode : 'development',
    // указываем какой файл является входным для нашего проекта 
    entry : {
        main: './scripts/index.js'
    },
    // место куда файл отправляет в результате работы вебпака
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename : 'script/[name].[hash].js',
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/')
        },
        port: 4000,
        open : true
    },
    resolve: {
        alias: {
            '@':path.resolve(__dirname, 'src')
        }
    },
    // для добавления и использования любых плагинов
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.pug'
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader:'html-loader'
            },
            {
                test: /\.pug$/i,
                loader:'pug-loader'
            },
            {
                test: /\.css$/i,
                use: cssLoader()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoader('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                }
            },
            {
                test : /\.js$/,
                use : ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
}