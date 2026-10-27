import coreWebVitals from "eslint-config-next/core-web-vitals";

// Flat config (ESLint 9+), same ruleset as WibuHub.
const config = [
  { ignores: [".next/**", "node_modules/**", "coverage/**", "next-env.d.ts"] },
  ...coreWebVitals,
  {
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "warn",
    },
  },
];

export default config;
