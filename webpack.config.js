const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        //if you want to do code splitting, you can have multiple entry paths
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', //since i have bundle: object in entry, filename will be the name of whichever entry path used
        clean: true, // prevents multiple bundles from being created on npm run build
        assetModuleFilename: '[name][ext]', //if we dont put this, images will get renamed to somethign weird
    },
    devtool: 'source-map', //helps with debugging
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true, //when we run npm run dev itll open automatically
        hot: true, //hot reloading
        compress: true, //enables gzip compression
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/, //anything with a js extension, but dont want node modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // no longer need file-loader, webpack 5 has built in types
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Webpack App',
        filename: 'index.html',
        template: 'src/template.html'
    })]
}