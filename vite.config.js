import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression';
import viteSvgIcons from 'vite-plugin-svg-icons';
import path, { resolve } from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslintPlugin from 'vite-plugin-eslint';
import { viteMockServe } from 'vite-plugin-mock';
import { baseURL } from './src/utils/baseUrl';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers:
      [ElementPlusResolver()],
    }),
    viteCompression(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    eslintPlugin({
      cache: false,
    }),
    viteMockServe({
      mockPath: 'src/mock',
      supportTs: false,
    }),
  ],
  server: {
    host: baseURL,
    port: 8900,
    // 是否开启 https
    https: false,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': resolve(__dirname, 'src'),
      utils: resolve(__dirname, 'src/utils'),
    },
  },
});
