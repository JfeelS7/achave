import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      semi: ["error", "always"],        // obriga ponto e vírgula
      quotes: ["error", "single"],      // obriga aspas simples
    },
  },
  tseslint.configs.recommended,
]);
