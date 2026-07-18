import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
      colors: {
        // Core Theme Palettes mapped from your val constants
        deepOceanBlue: "#005CBB",
        deepOceanBlueDark: "#4A90E2",
        mintGreen: "#00C853",
        mintGreenDark: "#69F0AE",

        // Status Indicators from plan.md
        intakeAmber: "#FFFFAB00",
        processingSkyBlue: "#03A9F4",
        readyEmeraldGreen: "#4CAF50",
        errorCrimsonRed: "#D32F2F",

        // Core Dark Theme Neutral System
        backgroundDark: "#1A1C1E",
        surfaceDark: "#1A1C1E",
        onSurfaceDark: "#E2E2E6",
        surfaceVariantDark: "#44474E",
      },
    },
  },
  plugins: [],
};
export default config;