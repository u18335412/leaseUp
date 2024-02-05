import { global } from "./plugin";
import { Config } from "tailwindcss/types/config";

export const globalPreset = {
  content: [],
  plugins: [require("tailwindcss-animate"), global],
} satisfies Config;
