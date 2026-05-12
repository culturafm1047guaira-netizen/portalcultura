import { defineConfig, globalIgnores } from "eslint/config";
import pluginNext from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = defineConfig([
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
    rules: {
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "legacy/**",
    "api/**",
    "tests/**",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
