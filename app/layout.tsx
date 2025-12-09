import "./globals.css";
import { Inter, Lora } from "next/font/google";
import type { ReactNode } from "react";
import {Toaster} from 'sonner'

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
  title: " Ricardo Prim Melo — Mentor de Recuperação e Desenvolvimento Humano",
  description:
    "Mentor de Recuperação e Desenvolvimento Humano. Acompanhamento prático para recuperação, objetivos de vida e hábitos saudáveis. Sessões online",
};


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-body">{children}
      <Toaster richColors position="top-center"/>
      </body>
    </html>
  );
}
