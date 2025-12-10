import json from "@rollup/plugin-json"
import path from "path"
import esbuild from "rollup-plugin-esbuild"
import sourcemaps from "rollup-plugin-sourcemaps"
import { typescriptPaths } from "rollup-plugin-typescript-paths"

// Function to automatically mark all non-local imports as external
const isExternal = (id) => {
  return !id.startsWith(".") && !path.isAbsolute(id) && !id.startsWith("@/")
}

const config = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es",
    sourcemap: true,
  },
  external: isExternal,
  plugins: [
    json(),
    typescriptPaths({
      tsconfig: "./tsconfig.json",
      preserveExtensions: true,
      nonRelative: false,
    }),
    sourcemaps(),
    esbuild({
      sourceMap: true,
      minify: false,
      treeShaking: false,
      sourcesContent: true,
    }),
  ],
}

export default config
