module.exports = {

    runtimeCompiler: true,
    css: {
        extract: true,
    },
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        output: {
            filename: '[name].js'
        }
    }
}
