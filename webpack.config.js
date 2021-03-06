var path = require("path");
var webpack = require("webpack");

var ENV = process.env.NODE_ENV || "development";
var API_URL = process.env.API_URL || "https://localhost:8443/marketplace";
var LOGOUT_URL = process.env.LOGOUT_URL || "#";
var HELP_URL = process.env.HELP_URL || "../hud-ui/assets/PlaceholderUserGuide.pdf";
var METRICS_URL = process.env.METRICS_URL || "https://www.owfgoss.org:10443/dev/metrics/";
var HUD_URL = process.env.HUD_URL || "http://localhost:8088/dist";

module.exports = {
    // This is the main file that should include all other JS files
    entry: "./app/js/main.js",
    target: "web",
    debug: true,
    cache: true,
    output: {
        path: path.join(__dirname, "dist/assets"),
        publicPath: "assets/",
        // If you want to generate a filename with a hash of the content (for cache-busting)
        // filename: "main-[hash].js",
        filename: "main.js",
        chunkFilename: "webpack.[hash].js"
    },
    resolve: {
        alias: {
            react$: "react/addons",
            jquery$: "jquery/dist/jquery",
            bootstrap$: "bootstrap-sass/assets/javascripts/bootstrap",
            carouFredSel$: "carouFredSel/jquery.carouFredSel-6.2.1",
            lodash: "lodash-amd/modern",
            "magnific-popup$": "magnific-popup/dist/jquery.magnific-popup",
            w2ui$: "w2ui/dist/w2ui",
            classification$: "ozp-classification/jquery.classification.js"
        },
        // Configure webpack to look for required files in bower and node
        modulesDirectories: ['./bower_components', './node_modules']
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: "jshint-loader", exclude: /node_modules|bower_components|gulp|dist/ }
        ],
        loaders: [
            { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.jsx?$/, loader: "jsx-loader?harmony=true&insertPragma=React.DOM" }
        ],
        noParse: /\.min\.js/
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify(ENV),
            },
            "API_URL": JSON.stringify(API_URL),
            "LOGOUT_URL": JSON.stringify(LOGOUT_URL),
            "HELP_URL": JSON.stringify(HELP_URL),
            "METRICS_URL": JSON.stringify(METRICS_URL),
            "HUD_URL": JSON.stringify(HUD_URL)
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        })
    ]
};
