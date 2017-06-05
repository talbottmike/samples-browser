var path = require("path");
var webpack = require("webpack");

function resolve(filePath) {
  return path.join(__dirname, filePath)
}

var samples = {
    "canvas": resolve("./canvas/Canvas.fsproj"),
    "d3map": resolve("./d3map/d3map.fsproj"),
    "funsnake": resolve("./funsnake/Funsnake.fsproj"),
    "hokusai": resolve("./hokusai/Hokusai.fsproj"),
    "lsystem": resolve("./lsystem/LSystem.fsproj"),
    "mandelbrot": resolve("./mandelbrot/Mandelbrot.fsproj"),
    "mario": resolve("./mario/Mario.fsproj"),
    "pacman": resolve("./pacman/Pacman.fsproj"),
    "pixi": resolve("./pixi/Pixi.fsproj"),
    "pong": resolve("./pong/Pong.fsproj"),
    "samegame": resolve("./samegame/SameGame.fsproj"),
    "ozmo": resolve("./ozmo/Ozmo.fsproj"),
    "react-todomvc": resolve("./react-todomvc/React.TodoMVC.fsproj"),
    "redux-todomvc": resolve("./redux-todomvc/Redux.TodoMVC.fsproj"),
    "vue-todomvc": resolve("./vue-todomvc/Vue.TodoMVC.fsproj"),
    "webgl-terrain": resolve("./webGLTerrain/webGLTerrain.fsproj"),   
}

var babelOptions = {
  presets: [["es2015", { "modules": false }]],
  plugins: ["transform-runtime"]
};

var isProduction = process.argv.indexOf("-p") >= 0;
console.log("Bundling for " + (isProduction ? "production" : "development") + "...");

module.exports = {
  devtool: "source-map",
  entry: samples,
  output: {
    filename: "[name].js",
    path: resolve('./build'),
    publicPath: '/build'
  },
  resolve: {
    modules: [
      "node_modules", resolve("./node_modules/")
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "PIXI": "PIXI",
    "three": "THREE",
    "redux": "Redux",
    "queue": "queue",
    "topojson": "topojson",
    "d3": "d3"
  },
  devServer: {
    contentBase: resolve('.'),
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.fs(x|proj)?$/,
        use: {
          loader: "fable-loader",
          options: {
            babel: babelOptions,
            define: isProduction ? [] : ["DEBUG"]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        },
      }
    ]
  }
};