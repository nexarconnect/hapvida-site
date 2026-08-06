import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  // 1. Varre todos os arquivos para remover CSS não utilizado
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 2. Cores da identidade Hapvida
      colors: {
        'hapvida-blue': '#002b5c',
        'hapvida-orange': '#ff8200',
      },
      // 3. Fontes customizadas para classes Tailwind (ex: font-pitanga)
      fontFamily: {
        pitanga: ['Pitanga', 'Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  // 4. Garante que classes dinâmicas de Toasts e Logs não sejam removidas
  safelist: [
    'bg-red-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-slate-100',
    'text-red-700', 'text-yellow-700', 'text-green-700', 'text-blue-700', 'text-slate-700',
    'text-red-600', 'text-yellow-600', 'text-green-600', 'text-blue-600', 'text-slate-800',
  ],
  plugins: [typography],
};