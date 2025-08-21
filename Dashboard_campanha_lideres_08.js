import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 👇 coloque o nome do repositório entre as barras
  base: "/Lideres-dashboard/", 
});
