import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      exclude: ['**/*.test.ts', '**/*.spec.ts']
    })
  ],
  build: {
    lib: {
      entry: path.resolve(process.cwd(), 'src/index.ts'),
      name: 'WidgetXFormer',
      fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [],
      output: {
        // Provide global variables for externalized deps in UMD build
        globals: {}
      }
    },
    sourcemap: true,
    minify: 'terser',
    target: 'es2020'
  }
})
