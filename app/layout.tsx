import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TailwindIndicator } from "@/components/TailwindIndicator";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Министерство внутренних дел Комаринской народной республики",
  description: "Официальный сайт Министерства внутренних дел Комаринской народной республики",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}
