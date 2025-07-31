import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,page.tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,page.tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,page.tsx}",
  ],
  theme: {
    extend: {
     colors: {
        'arknights': {
          black: '#0d0c12', // 深空黑
          blue: '#1a3a8f',  // 主品牌蓝
          gold: '#d4af37',  // 标志性金色
          dark: '#030303',  //深黑背景
          light: '#e6f7ff'  // 浅蓝文字

        }
      }
    },
  },
  important: true, // 给 tailwindcss 的样式加上最高优先级
  plugins: [],
};
export default config;
