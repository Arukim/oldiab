const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const PHASER_DIR = path.join(__dirname, '/node_modules/phaser');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    devtool: 'inline-source-map',
    entry: './index.ts',
    output: {
        filename: 'dist/bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'], // note if using webpack 1 you'd also need a '' in the array as well
        alias: {
            // https://github.com/webpack/webpack/issues/4666
            constants: `${APP_DIR}/constants`,
            phaser: path.join(PHASER_DIR, 'build/custom/phaser-split.js'),
            pixi: path.join(PHASER_DIR, 'build/custom/pixi.js'),
            p2: path.join(PHASER_DIR, 'build/custom/p2.js'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /pixi\.js/,
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'PIXI',
                    }
                ]
            },
            {
                test: /phaser-split\.js$/,
                use: [{
                    loader: 'expose-loader',
                    options: 'Phaser',
                }],
            },
            {
                test: /p2\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'p2',
                }],
            },
        ],
    }
}