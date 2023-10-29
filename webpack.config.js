const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: `${__dirname}/dist`,
        filename: "main.js",
    },
    devServer: {
        static: {
            directory: "./dist",
        },
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    mode: "development",
    module: {
        rules: [
            { test: /\.tsx$/, loader: "babel-loader", exclude: /node_modules/ },
            { test: /\.ts$/, loader: "babel-loader", exclude: /node_modules/ },
            { test: /\.css/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }], exclude: /node_modules/ }
        ],
    },
    plugins: [
        new NodePolyfillPlugin()
    ]
};