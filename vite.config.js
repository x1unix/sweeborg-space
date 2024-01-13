/** @type {import('vite').UserConfig} */
import pkg from './package.json'

const isProduction = process.env.NODE_ENV.toLowerCase().startsWith('prod')
export default {
    base: isProduction ? pkg.homepage : '/'
}
