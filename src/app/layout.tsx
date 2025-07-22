import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AskMira - Keeping it Real",
  description: "AI-powered content verification platform. Detect deepfakes, verify authenticity, and fight misinformation with cutting-edge technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        style={{ "--font-rubik": rubik.style.fontFamily } as React.CSSProperties}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
