const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
			rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
						{
							test: /\.(woff(2)?|eot|ttf|otf)$/i,
							type: 'asset/resource',
						},
						{
							test: /\.css$/i,
							use: ['style-loader', 'css-loader']
						},
						{
							test: /\.scss$/i,
							use: ['style-loader', 'css-loader', 'sass-loader']
						},
				{
					test: /\.ts$/i,
					use: 'ts-loader',
					exclude: /node-modules/,
				},
        ],
    },
    resolve: {
			extensions: ['.ts', '.js'],
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
    },
    output: {
				filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
				assetModuleFilename: 'assets/[hash][ext]'
    },
    plugins: [
				// new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        new HtmlWebpackPlugin({
						template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
    return merge(baseConfig, envConfig);
};
