/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  modifyVars: { "@primary-color": "#cb997e", "@link-color": "#cb997e" },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    return config;
  },
});
