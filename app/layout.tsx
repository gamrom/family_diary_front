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

        <title>패밀리 다이어리</title>
        <meta name="title" content="패밀리 다이어리" />
        <meta
          name="description"
          content="바쁜 부모들을 위해 간편하게 작성 가능한 육아일기"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="패밀리 다이어리" />
        <meta
          property="og:description"
          content="바쁜 부모들을 위해 간편하게 작성 가능한 육아일기"
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="패밀리 다이어리" />
        <meta
          property="twitter:description"
          content="바쁜 부모들을 위해 간편하게 작성 가능한 육아일기"
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />
      </head>
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
