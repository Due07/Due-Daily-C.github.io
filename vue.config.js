const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            // 像素的基数，一经修改 就要重新启动serve
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
  publicPath: './',
  outputDir: 'docs',
};
