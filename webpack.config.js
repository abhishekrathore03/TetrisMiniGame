var path = require('path');

module.exports = {
    entry: ["./src/Main.ts"],
    mode: 'development',
    output: {
        filename: "./bundle.js",
    },
    watch: true,
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    module: {
		rules: [
			{ test: /\.js$/, use: "source-map-loader"},
            { test: /\.tsx?$/, use: "ts-loader"},
            { include: path.resolve(__dirname, "node_modules/pixi-particles"), loader: "transform?brfs" },
			{ include: path.resolve(__dirname, "node_modules/pixi.js"), loader: "transform?brfs" }
		]
    },
    externals: [
        {"pixi.js": "PIXI"}
    ]

};