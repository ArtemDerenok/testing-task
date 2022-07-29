import path from "path";
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: "./src/index.tsx",
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
          test:/\.(s*)css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
            test: /\.(svg|png|gif|jpg)$/,
            exclude: /fonts/,
            loader: 'file-loader'
        },
        {
            test: /\.(ttf|eot|woff|svg|woff2)$/,
            loader: "file-loader"
        }

    ],
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.html')
      }),
      new MiniCssExtractPlugin(),
  ],
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
  },
};

export default config;
