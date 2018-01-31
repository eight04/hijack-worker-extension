import vue from "rollup-plugin-vue";

export default {
  input: "index.js",
  output: {
    file: "../dist/options.js",
    format: "iife"
  },
  plugins: [vue()]
};
