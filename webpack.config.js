const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
    mode: isLocal ? "development" : "production",
    devtool: isLocal ? "source-map" : "none",
    entry: slsw.lib.entries,
    target: "node",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    output: {
        libraryTarget: "commonjs2",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
    },
    plugins: [],
    externals: [
        nodeExternals({
            allowlist: [/^lodash/],
        }),
    ],
    module: {
        unknownContextCritical: false,
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /^(?!.*\.test\.ts$).*\.(ts|js)x?$/,
                exclude: [
                    [
                        path.resolve(__dirname, "node_modules"),
                        path.resolve(__dirname, ".serverless"),
                        path.resolve(__dirname, ".webpack"),
                    ],
                ],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
            },
        ],
    },
};
