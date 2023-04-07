const {defineConfig} = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const {VantResolver} = require('unplugin-vue-components/resolvers');
const {ElementPlusResolver} = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
    //基本路径
    //默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
    publicPath: './',

    //输出文件目录
    outputDir: 'dist',
    indexPath: 'index.html',
    //css相关配置
    css: {
        //是否使用css分离插件ExtractTextPlugin
        // extract: true,
        //开启CSS sourcemaps?
        sourceMap: false,
    },
    //生产环境是否生成sourceMap文件
    productionSourceMap: false,
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver(), VantResolver()],
            }),
        ],
    },
});