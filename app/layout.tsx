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
    <html lang="ko" className="light">
      <head>
        <Script
          type="module"
          src="https://cdn.jsdelivr.net/npm/media-chrome@3/+esm"
        ></Script>

        {/* <meta name="title" content="패밀리 다이어리" />
        <meta
          name="description"
          content="바쁜 부모들을 위해 간편하게 작성 가능한 육아일기"
        />

        <meta name="keywords" content="육아,아이,일기" />
        <meta name="robots" content="index,follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Korean" /> */}

        <title>패밀리 다이어리</title>
        <meta
          name="description"
          content="바쁜 부모들을 위해 간편하게 작성 가능한 육아일기"
        />

        <meta property="og:url" content="https:/family.fivedice.site" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="패밀리 다이어리" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="/og_image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="gambodong.com" />
        <meta property="twitter:url" content="https:/family.fivedice.site" />
        <meta name="twitter:title" content="패밀리 다이어리" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="/og_image.jpg" />
      </head>
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
