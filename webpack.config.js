{
    test: /\.less$/,
        use: [
            'vue-style-loader',
            'css-loader',
            'less-loader',
            options: {
                sourceMap: false,
                    shadowMode: true  // <---
            }
        ]
}
