import solid from "solid-start/vite";
import { defineConfig } from "vite";
import windiCSS from "vite-plugin-windicss";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [windiCSS(), solid(), tsConfigPaths()],
});
