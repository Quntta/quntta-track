const path = require('path');
const { defineConfig } = require('vite');
module.exports = defineConfig({
  target: 'es2015',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'qunttaTrack',
      fileName: (format) => `quntta-track-sdk.${format}.js`
    }
  },
  // @路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    open: true
  }
});
