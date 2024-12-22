import {defineConfig} from 'vite';
import {globSync} from 'tinyglobby';
import {nodeExternals} from 'rollup-plugin-node-externals';
import pkg from './package.json' with {type: 'json'};

const external = [...Object.keys(pkg.dependencies || []), /^lit/, 'monaco-editor'];
const srcDir = 'src';
const srcGlob = `${srcDir}/**/*.ts`;

const entries = Object.fromEntries(
  globSync(srcGlob).map((file) => {
    const [key] = file.match(new RegExp(`(?<=${srcDir}\/).*`)) || [];
    return [key?.replace(/\.[^.]*$/, ''), file];
  })
);

export default defineConfig({
  plugins: [nodeExternals()],
  build: {
    target: ['es2022'],
    lib: {
      entry: entries,
      formats: ['es'],
    },
    minify: false,
    /* rollupOptions: {
      external,
    }, */
  },
});
