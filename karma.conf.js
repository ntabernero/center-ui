'use strict';

var RewirePlugin = require("rewire-webpack");
var webpackOptions = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            // including es5-shim for PhantomJS
            'bower_components/es5-shim/es5-shim.js',
            'app/js/**/*-test.js'
        ],
        preprocessors: {
            'app/js/**/*test.js': ['webpack']
        },
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        webpack: {
            cache: true,
            resolve: webpackOptions.resolve,
            module: {
                loaders: webpackOptions.module.loaders,
                postLoaders: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)\//,
                    loader: 'istanbul-instrumenter'
                }],
                noParse: webpackOptions.module.noParse
            },
            plugins: webpackOptions.plugins.concat([
                new RewirePlugin()
            ])
        },
        webpackServer: {
            stats: {
                colors: true
            }
        },
        exclude: [],
        port: 8080,
        logLevel: config.LOG_DEBUG,
        colors: true,
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        reporters: ['coverage'],
        captureTimeout: 60000,
        singleRun: true
    });
};
