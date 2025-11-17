import "./globals.css";
import { Inter, Lora } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata = {
  title: "Ricardo Prim Melo",
  description: "Coaching, PNL e desenvolvimento pessoal",
};

// 👉 AQUI ESTÁ A CORREÇÃO!
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
