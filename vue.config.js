module.exports = {
  css: {
    // 使用scss全域變數的方法 sass-loader版本不同寫法會不一樣 再上網查。
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/_variables.scss";`,
      },
    },
  },
};
