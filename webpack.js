const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.join(__dirname, 'electron/main.js'),
    output: {
        path: path.join(__dirname, 'electron'),
        filename: 'app.js',
    },
    target: 'node',
    externals: [nodeExternals()],
    externalsPresets: {
        node: true
    },
    mode: 'production',
};