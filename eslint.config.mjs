import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  // Next.js recommended rules
  ...nextVitals,
  ...nextTs,

  // Custom rules for the project
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },

    rules: {
      /* ------------------------------
       * Clean unused code
       * ------------------------------ */
      "unused-imports/no-unused-imports": "error",

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Disable TS duplicate rule (handled above)
      "@typescript-eslint/no-unused-vars": "off",

      /* ------------------------------
       * Import order
       * ------------------------------ */
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      /* ------------------------------
       * TypeScript sanity (dashboard-friendly)
       * ------------------------------ */
      "@typescript-eslint/no-explicit-any": "warn",

      /* ------------------------------
       * React / Next tweaks
       * ------------------------------ */
      "react/react-in-jsx-scope": "off", // Next.js auto-imports React
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // Disable formatting rules in favor of Prettier
  prettier,
]);

export default eslintConfig;
