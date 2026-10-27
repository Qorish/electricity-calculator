import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "var(--color-paper)", 2: "var(--color-paper-2)", 3: "var(--color-paper-3)" },
        ink: { DEFAULT: "var(--color-ink)", 2: "var(--color-ink-2)" },
        muted: "var(--color-muted)",
        rule: "var(--color-rule)",
        accent: { DEFAULT: "var(--color-accent)", 2: "var(--color-accent-2)", ink: "var(--color-accent-ink)" },
        danger: { DEFAULT: "var(--color-error)", field: "var(--color-error-field)" },
      },
      fontFamily: { display: "var(--font-display)", body: "var(--font-body)", mono: "var(--font-outlier)" },
      borderRadius: { card: "var(--radius-card)", control: "var(--radius-control)" },
      maxWidth: { page: "var(--container)" },
    },
  },
  plugins: [],
};

export default config;
