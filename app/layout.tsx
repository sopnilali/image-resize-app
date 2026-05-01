import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fast Online Image Resizer, Compressor and Format Converter Platform",
  description:
    "Resize images by exact pixels, compress files without visible quality loss, and export in JPG, PNG, or WebP directly in your browser with a fast, private, and reliable workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} image-resizer-page`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var key='image-resizer-theme';var t=localStorage.getItem(key);if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.removeAttribute('data-theme');}}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
