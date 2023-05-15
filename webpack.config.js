const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve("src"),
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              name: "[name][md5:hash].[ext]",
              outputPath: "assets/",
              publicPath: "/assets/",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(pdf|doc|zip)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ["babel-loader"],
        include: path.resolve("src"),
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
  plugins: [new MiniCssExtractPlugin()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
