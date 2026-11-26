import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  { ignores: ["dist/**", ".astro/**", ".verification/**"] },
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["src/**/*.{js,mjs}", "public/**/*.{js,mjs}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["scripts/verify.mjs"],
    languageOptions: { globals: { document: "readonly", window: "readonly" } },
  },
  {
    files: ["scripts/**/*.mjs", "*.config.mjs"],
    languageOptions: { globals: globals.node },
  },
];
