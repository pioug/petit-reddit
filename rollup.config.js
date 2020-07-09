import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

export default {
  input: "main.js",
  output: {
    file: "bundle.js",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      babelHelpers: "bundled",
    }),
    commonjs(),
    resolve({
      browser: true,
    }),
    terser({
      output: {
        comments: false,
      },
    }),
  ],
};
