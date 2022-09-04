const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/wid": {
        target: "http://www.kma.go.kr"
        //changeOrigin: true
      }
    }
  }
});
