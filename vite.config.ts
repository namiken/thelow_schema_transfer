import react from '@vitejs/plugin-react'
import { polyfillNode } from "esbuild-plugin-polyfill-node";
export default {
  optimizeDeps: {
    esbuildOptions: {
      plugins: [polyfillNode({})],
    },
  },
  plugins: [react({})]
};