import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const config = {
    root: process.cwd(), // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    base: './', // 公共基础路径。
    plugins: [ // 需要用到的插件数组。
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })],
    publicDir: 'public', // 作为静态资源服务的文件夹。
    cacheDir: 'node_modules/.vite', // 存储缓存文件的目录。
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // 文件路径别名。
      }
    },
    logLevel: 'info', // 控制台输出的级别。
    envPrefix: 'VITE_', // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
    server: {
      host: 'localhost', // 服务器监听的 IP 地址。
      port: env.VITE_APP_PORT, // 服务器端口。
      strictPort: false, // 若端口占用是否尝试下一个可用端口。
      open: false, // 自动打开浏览器。
      proxy: env.VITE_APP_PROXY === 'false' ? null : { // 代理。
        '/proxy': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          pathRewrite: {
            '^/proxy': '/'
          }
        }
      },
      cors: true // 配置 CORS。
    },
    build: {
      target: 'modules', // 设置最终构建的浏览器兼容目标。
      polyfillModulePreload: true, // 决定是否自动注入 module preload 的 polyfill。
      outDir: 'blog', // 指定输入路径（相对于项目根目录）。
      assetsDir: 'assets', // 指定生成静态资源的存放路径（相对于 build.outDir）。
      sourcemap: '', // 构建后是否生成 source map 文件。 boolean | 'inline' | 'hidden'
      brotliSize: true, // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢。
      chunkSizeWarningLimit: 500 // chunk 大小警告的限制（以 kbs 为单位）。
    }
  }
  return config
})
