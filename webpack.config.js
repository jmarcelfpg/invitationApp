const path = require('path');

// unfinished config for server
const serverConfig = {
    target: 'node',
    entry: path.resolve(__dirname, 'src' , 'server', 'index.ts'),
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
        index: path.resolve(__dirname, 'src' , 'public', 'js', 'index.ts'),
        register: path.resolve(__dirname, 'src' , 'public', 'js', 'register.ts'),
        board: path.resolve(__dirname, 'src' , 'public', 'js', 'board.ts'),
        resetPass: path.resolve(__dirname, 'src' , 'public', 'js', 'resetPass.ts')
    },
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: "[name].js"
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

module.exports = [/* serverConfig, */ clientConfig]