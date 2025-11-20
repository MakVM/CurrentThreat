import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".",         // <-- point to your React app folder
  base: "/website-demo3/",
  plugins: [react()],
  build: {
    outDir: "dist-spa",    // relative to root
    emptyOutDir: true,
    
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

