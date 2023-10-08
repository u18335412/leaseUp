import type { Config } from 'tailwindcss';
import { globalPreset } from 'tailwind-preset';

const config: Config = {
  presets: [globalPreset],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
};

export default config;
