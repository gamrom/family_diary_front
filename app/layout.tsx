import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";

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
    <html lang="ko" className="dark">
      <head>
        <Script
          type="module"
          src="https://cdn.jsdelivr.net/npm/media-chrome@3/+esm"
        ></Script>
      </head>
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
