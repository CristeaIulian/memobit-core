import { copyFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const distDir = resolve(import.meta.dirname, 'dist');

export default defineConfig({
    plugins: [
        dts({ tsconfigPath: './tsconfig.json', bundleTypes: true }),
        {
            // CommonJS consumers resolve the `require` condition and need declarations TypeScript
            // reads as CommonJS; the bundled types have no relative imports, so a copy is enough.
            name: 'memobit-core-cjs-types',
            closeBundle() {
                copyFileSync(resolve(distDir, 'index.d.ts'), resolve(distDir, 'index.d.cts'));
            },
        },
    ],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            formats: ['es', 'cjs'],
            fileName: format => (format === 'es' ? 'index.js' : 'index.cjs'),
        },
        sourcemap: false,
        minify: false,
        target: 'es2022',
    },
});
