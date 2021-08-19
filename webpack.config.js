
const path=require("path");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const MiniExtractCssPlugin=require("mini-css-extract-plugin");

module.exports={
    entry:'./src/index.ts',
    output:{
        path:path.resolve(__dirname,"build"),
        filename:'main.js'
    },
    module:{
        rules:[{
            test:/\.ts$/,
            use:[
                {
                loader:"babel-loader",
                options:{
                    presets:[
                        [
                            "@babel/preset-env",
                            {
                                targets:{
                                    "chrome":"87",
                                    "ie":"11"
                                },
                                "corejs":"3",//处理Promise，Proxy新类
                                "useBuiltIns":"usage"
                            }
                        ]
                    ]
                }
            },
            "ts-loader"],
            exclude:/node_modules/
        },{
            test: /\.css$/,
            use: [
                MiniExtractCssPlugin.loader,"css-loader","postcss-loader"
            ]
          },
          {
            test:/\.vue$/,
            use:['vue-loader']
          },{
              test:/\.less$/,
              use:[
                MiniExtractCssPlugin.loader,
                   "css-loader",
                  "postcss-loader",
                  "less-loader"
              ]
          }],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new MiniExtractCssPlugin({
            filename:"css/snake.css"
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
      
    ],
    devServer:{
        contentBase:'./jjccdist',
        compress:true,
        inline:true,
        port:8088
    },
    resolve:{
        extensions:[".ts",".js",".vue"]
    },
    mode:'development'
}