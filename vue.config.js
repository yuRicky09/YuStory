const webpack = require("webpack");

module.exports = {
  css: {
    // 使用scss全域變數的方法 sass-loader版本不同寫法會不一樣
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/_variables.scss";`,
      },
    },
  },
  configureWebpack: {
    // ...
    plugins: [
      // register Quill globally (source: https://www.vue2editor.com/examples/#how-to-use-custom-quill-modules)
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
      }),
    ],
  },
};
