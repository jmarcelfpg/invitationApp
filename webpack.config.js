const path = require('path');
const webpack = require('webpack');

// unfinished config for server
const serverConfig = {
    target: 'node',
    entry: path.resolve(__dirname, 'src', 'server', 'index.ts'),
    output: {
        path: path.resolve(__dirname),
        filename: "index.js"
    },
    devtool: 'sourcemap',
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx']
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            }
        ]
    }
}

// consider improve the clientConfig to aviod mix all the modules in one bundle
const clientConfig = {
    target: 'web',
    entry: {
        signin: path.resolve(__dirname, 'src', 'public', 'ts', 'index.ts'),
        register: path.resolve(__dirname, 'src', 'public', 'ts', 'register.ts'),
        resetPass: path.resolve(__dirname, 'src', 'public', 'ts', 'resetPass.ts'),
        admin: path.resolve(__dirname, 'src', 'public', 'ts', 'admin.ts'),
        profile: path.resolve(__dirname, 'src', 'public', 'ts', 'profile.ts'),
        nav: path.resolve(__dirname, 'src', 'public', 'ts', 'nav.ts'),
        vendor: ["axios"]
    },
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: "[name].js",
    },
    devtool: 'sourcemap',
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx']
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    }
}

module.exports = [/* serverConfig, */ clientConfig]