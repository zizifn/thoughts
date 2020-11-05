const path = require('path');
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'custom-output-bundle-name.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:
                {
                    loader: "babel-loader",
                    options: {
                        // include: __dirname + '/src',
                        presets: ["@babel/preset-env"]
                    }
                }

            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    // {
                    //     loader: "to-string-loader",
                    // },
                    {
                        loader: "css-loader",
                    },

                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({ template: './src/index.html' })
        // new VueLoaderPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         { from: 'src/*.html', to: '[name].[ext]' }
        //     ],
        // })
    ]
};