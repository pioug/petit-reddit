import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "main.js",
  output: {
    file: "bundle.js",
    format: "iife"
  },
  plugins: [commonjs(), resolve()]
};
