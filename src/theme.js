// src/theme.js
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: "#f5f3ff" },
          100: { value: "#ede9fe" },
          200: { value: "#ddd6fe" },
          300: { value: "#c4b5fd" },
          400: { value: "#a78bfa" },
          500: { value: "#8b5cf6" }, // Elegant Lavender/Violet
          600: { value: "#7c3aed" },
          700: { value: "#6d28d9" },
          800: { value: "#5b21b6" },
          900: { value: "#4c1d95" },
        },
        healthTeal: {
          50:  { value: "#f0fdfa" },
          100: { value: "#ccfbf1" },
          200: { value: "#99f6e4" },
          300: { value: "#5eead4" },
          400: { value: "#2dd4bf" },
          500: { value: "#0d9488" }, // Calming Forest Teal
          600: { value: "#0f766e" },
          700: { value: "#115e59" },
          800: { value: "#134e4a" },
          900: { value: "#042f2e" },
        },
        warmOrange: {
          50:  { value: "#fffbeb" },
          100: { value: "#fef3c7" },
          200: { value: "#fde68a" },
          300: { value: "#fcd34d" },
          400: { value: "#fbbf24" },
          500: { value: "#f59e0b" }, // Soft Amber (replaces harsh warning red)
          600: { value: "#d97706" },
          700: { value: "#b45309" },
          800: { value: "#92400e" },
        },
      },
      fonts: {
        heading: { value: "'Outfit', 'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
      radii: {
        xl: { value: "20px" },
        "2xl": { value: "32px" },
      },
    },
    semanticTokens: {
      colors: {
        bgGradient: {
          value: {
            _light: "linear-gradient(135deg, #f5f3ff 0%, #e0f2fe 45%, #f0fdf4 100%)",
            _dark: "linear-gradient(135deg, #0f0724 0%, #03040c 50%, #021f1e 100%)",
          },
        },
        cardBg: {
          value: {
            _light: "rgba(255, 255, 255, 0.45)",
            _dark: "rgba(13, 9, 29, 0.55)",
          },
        },
        cardBorder: {
          value: {
            _light: "rgba(255, 255, 255, 0.7)",
            _dark: "rgba(139, 92, 246, 0.12)",
          },
        },
        textColor: {
          value: {
            _light: "#1e1b4b", // Deep indigo-slate
            _dark: "#f5f3ff",
          },
        },
        mutedText: {
          value: {
            _light: "#6b7280",
            _dark: "#a5b4fc",
          },
        },
      },
    },
    layerStyles: {
      glass: {
        bg: "cardBg",
        backdropFilter: "blur(20px)",
        borderRadius: "xl",
        border: "1px solid",
        borderColor: "cardBorder",
        boxShadow: {
          _light: "0 10px 40px -10px rgba(139, 92, 246, 0.08)",
          _dark: "0 10px 40px -10px rgba(0, 0, 0, 0.4)",
        },
      },
      glassPanel: {
        bg: { _light: "rgba(255, 255, 255, 0.25)", _dark: "rgba(139, 92, 246, 0.04)" },
        backdropFilter: "blur(12px)",
        borderRadius: "xl",
        border: "1px solid",
        borderColor: "cardBorder",
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
