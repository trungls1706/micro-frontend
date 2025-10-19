import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

console.log(import.meta.env.MODE)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host-app",
      remotes: {
        productsApp:"https://micro-frontend-remote-product.vercel.app/assets/remoteEntry.js",
        cartApp:"https://micro-frontend-remote-cart.vercel.app/assets/remoteEntry.js",
        // productsApp: import.meta.env.MODE === "production"
        //   ? "https://micro-frontend-remote-product.vercel.app/assets/remoteEntry.js"
        //   : "http://localhost:5001/assets/remoteEntry.js",
        // cartApp: import.meta.env.MODE === "production"
        //   ? "https://micro-frontend-remote-cart.vercel.app/assets/remoteEntry.js"
        //   : "http://localhost:5002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
