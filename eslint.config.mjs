import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 1. DOMAIN LAYER ENFORCEMENT
  {
    files: ["src/domain/**/*"],
    rules: {
      "no-restricted-imports": ["error", {
        "patterns": ["@data/*", "@presentation/*"],
        "message": "🚨 Clean Architecture Violation: The Domain layer must remain completely isolated and cannot import from Data or Presentation."
      }]
    }
  },

  // 2. DATA LAYER ENFORCEMENT
  {
    files: ["src/data/**/*"],
    rules: {
      "no-restricted-imports": ["error", {
        "patterns": ["@presentation/*"],
        "message": "🚨 Clean Architecture Violation: The Data layer cannot import from the Presentation UI layer."
      }]
    }
  }
];

export default eslintConfig;