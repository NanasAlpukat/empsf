const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'emps',
    themeColor: '#0993D3',
    msTileColor: '#FFFFFF',
  }
})
