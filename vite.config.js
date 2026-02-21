import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "client",
  server: {
    allowedHosts: [
      "43278d55-87dc-4291-97ad-54f374b9134b-00-19ek8zouuqtea.pike.replit.dev",
    ],
    host: "0.0.0.0",
    port: 5000,
  },
});
