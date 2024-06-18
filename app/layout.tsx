import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "family diary",
  description: "family diary epson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`max-w-[400px] mx-auto ${inter.className} font-inter px-[34px]`}
      >
        {children}
      </body>
    </html>
  );
}
