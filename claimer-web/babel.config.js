module.exports = {
  presets: [["next/babel"]],
  plugins: [
    ["import", { libraryName: "antd", style: true }],
    ["module-resolver", { alias: { "@": "./src" } }],
    ["add-react-displayname"],
  ],
};
