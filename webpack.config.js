/* global __dirname */

var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './src',
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'bacon.virtualdom.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            }
        ]
    },
    externals: [
        {
            baconjs: {
                root: 'Bacon',
                commonjs: 'baconjs',
                commonjs2: 'baconjs',
                amd: 'baconjs'
            },
            'virtual-dom': {
                root: 'virtualDom',
                commonjs: 'virtual-dom',
                commonjs2: 'virtual-dom',
                amd: 'virtual-dom'
            }
        }
    ]
};
