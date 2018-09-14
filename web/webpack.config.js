module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        contentBase: './src/public'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },  
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
}
