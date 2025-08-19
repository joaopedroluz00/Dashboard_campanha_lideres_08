import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // ⚠️ Nome EXATO do repositório no GitHub
  base: "/Dashboard_campanha_lideres_08/",
});
