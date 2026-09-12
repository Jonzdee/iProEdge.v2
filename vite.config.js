import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        id: "/",
        name: "iProEdge",
        short_name: "iProEdge",
        description: "Shop phones, tablets and electronics from iproedge",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
           
          },
        ],

        screenshots: [
          {
            src: "/pwa-mobile.png",
            sizes: "370x823",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/pwa-desktop.png",
            sizes: "1162x952",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },

      workbox: {
        navigateFallback: "/index.html",
      },
    }),
  ],

  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },

  server: {
    port: 3000,
  },
});