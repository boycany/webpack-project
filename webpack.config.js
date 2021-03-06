const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  // 模式 *(切換到 production ，開啟 tree shaking 功能)
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[fullhash].js",
  },
  //loader
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            }, //如果要在sass裡面下import語法，加這個設定webpack才讀得懂
          },
          {
            loader: "postcss-loader",
          }, //如果要配置loader以外的屬性的話，可以寫成物件形式
        ],
      },
      //asset loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "index.[fullhash].css",
    }),
  ],
  devtool: "source-map",
};
