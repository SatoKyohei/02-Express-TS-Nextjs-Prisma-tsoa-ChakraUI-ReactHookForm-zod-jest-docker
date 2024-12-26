import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ESLintのルールを適用しないファイル
  {
    ignores: [".next/*", "node_modules/*", "dist/*", "build/*"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // JS/TSファイルに適用するルール。必要に応じてこの{}を繰り返す
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    // languageOptions: { sourceType: "commonjs" },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.node,
      },
      ecmaVersion: 12, // これが parserOptions の es2021 に相当
    },
    rules: {
      "import/order": "error",
      "no-unused-vars": "warn", // 未使用変数に警告を出す
      "@typescript-eslint/no-unused-vars": "warn",
      semi: ["error", "always"], // セミコロンを必須にする
      "no-console": ["error", { allow: ["error"] }],
      "react/jsx-sort-props": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // eqeqeq: "error", // 厳密な比較を強制する
      "@typescript-eslint/no-empty-object-type": "off",
    },
    // 不要な無効化ディレクティブ( eslint-disable など)が無駄に使われていないかチェック
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // filesやignoresの記載がない場合は、全体にルール適用
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    // rules: {
    //   eqeqeq: "error", // 厳密な比較を強制する
    // },
  },
];

export default eslintConfig;
