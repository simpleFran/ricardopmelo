import "./globals.css";
import { Inter, Lora } from "next/font/google";

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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
