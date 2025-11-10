import { defineConfig } from 'tsup';

export default defineConfig((options) => [
  {
    entry: ['src/index.ts', 'src/preset.ts'],
    outDir: './dist',
    splitting: true,
    format: ['esm'],
dts: true,
    treeshake: true,
    sourcemap: false,
    /*
     keep this line commented until https://github.com/egoist/tsup/issues/1270 is resolved
     clean: options.watch ? false : true,
    */
    clean: false,
    platform: 'browser',
    esbuildOptions(options) {
      options.conditions = ['module'];
    },
  },
  {
    entry: ['src/postinstall.ts'],
    outDir: './bin',
splitting: true,
    format: ['esm'],
    treeshake: true,
    target: 'node20',
    clean: false,
    platform: 'node',
    esbuildOptions(options) {
      options.conditions = ['module'];
    },
  },
]);
