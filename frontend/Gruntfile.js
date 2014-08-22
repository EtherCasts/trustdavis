module.exports = function(grunt) {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                                    new webpack.DefinePlugin({
                                        "process.env": {
                                            // This has effect on the react lib size
                                            "NODE_ENV": JSON.stringify("production")
                                        }
                                    }),
                                    new webpack.optimize.DedupePlugin(),
                                    new webpack.optimize.UglifyJsPlugin()
                                )
            },
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
    },
    "webpack-dev-server": {
        options: {
            webpack: webpackConfig
        },
        start: {
            keepAlive: true,
            port: 8089,
            contentBase: "app",
            hot: true,
            webpack: {
                devtool: "eval",
                debug: true,
                entry: webpackConfig.entry.concat(
                    "webpack-dev-server/client?http://localhost:8089",
                    "webpack/hot/dev-server"
                ),
                plugins: webpackConfig.plugins.concat(
                    new webpack.HotModuleReplacementPlugin()
                )
            }
        }
    },
    watch: {
            app: {
                files: ["app/**/*"],
                tasks: ["webpack:build-dev"],
                options: {
                    spawn: false,
                }
            }
    },
    "gh-pages": {
        options: {
          base: 'app'
        },
        src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask("default", ["webpack-dev-server:start"]);
  grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);
  grunt.registerTask("build", ["webpack:build"]);
  grunt.registerTask("publish", ["build", "gh-pages"]);
};
