import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Literata, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const literata = Literata({ subsets: ["latin", "cyrillic"], variable: "--font-literata", display: "swap", weight: ["400", "500", "600"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ванильный Minecraft-сервер ${site.server.version}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["Minecraft", "сервер", "ванильный", "vanilla survival", "Java Edition", site.server.version, site.name],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} — ванильный Minecraft-сервер`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Долина с рекой и деревянным домиком на закате" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${literata.variable} ${jetbrains.variable}`}>
      <body>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
