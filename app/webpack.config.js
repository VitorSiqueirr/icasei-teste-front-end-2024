const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8080,
    open: false,
    proxy: [
      {
        context: ["/videos"],
        target: "http://localhost:4567",
        changeOrigin: true,
      },
      {
        context: ["/pagead/**", "/youtubei/**"], // Intercepta as URLs
        target: "https://www.youtube.com", // Redireciona para o servidor
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader("Origin", "https://www.youtube.com"); // Seta Origin como Youtube
        },
      },
    ],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
