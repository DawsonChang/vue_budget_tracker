// https://element.eleme.io/#/zh-CN/component/quickstart
// 照 element-ui 官網說的按需引入，但看這篇https://www.jianshu.com/p/2181f3c263c2
// 現在已經沒有.babelrc 變成 babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
