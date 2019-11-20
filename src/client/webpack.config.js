const webpack = require('webpack');


function config(env) {
    let target = env.TARGET || 'development';
    return {
        entry: __dirname + '/index.jsx',
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css/,
                    loaders: ['style-loader', 'css-loader'],
                }
            ]
        },
        plugins: [
          new webpack.NormalModuleReplacementPlugin(/(.*)TARGET(\.*)/, function(resource) {
            resource.request = resource.request.replace(/TARGET/, `${target}`);
          })
        ]
    }
}

module.exports = config;
