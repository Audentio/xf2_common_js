const path = require('path');
const webpack = require('webpack');

const webpackDir = path.resolve(__dirname);
const javascriptDir = path.resolve(webpackDir, '..');
const srcDir = path.resolve(javascriptDir, 'src');
const addonDir = path.resolve(javascriptDir, '..');
const sep = path.sep;
const splitAddonDir = addonDir.split(sep);
const addonName = splitAddonDir[splitAddonDir.length - 1].toLowerCase();
const outputDir = path.resolve(addonDir, '_files', 'js', 'themehouse', addonName);

const entries = require('../entries.js');
const entryObj = {};
for (let i = 0, len = entries.length; i < len; i++) {
    const entry = entries[i];
    entryObj[entry] = path.join(srcDir, entry); // output full
    entryObj[entry + '.min'] = path.join(srcDir, entry); // also output minified

}
console.log(entryObj);


module.exports = {
    entry: entryObj,
    output: {
        path: outputDir,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: srcDir,
                query: {
                    cacheDirectory: path.resolve(javascriptDir, 'tmpCache'),
                },
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
}
