import typescript from "@rollup/plugin-typescript";
// rollup.config.js
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [typescript({})]
};