import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Dashboard_campanha_lideres_08/", // nome EXATO do repo (maiúsculas/underscore contam)
});
