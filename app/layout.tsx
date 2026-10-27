import "./globals.css";
import { Albert_Sans, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";

const albert = Albert_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-albert", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-geist-mono", display: "swap" });

export const metadata = { title: site.title, description: site.description };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${albert.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
