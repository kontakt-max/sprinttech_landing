import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentManager, LinkedInInsightTag } from "@/components/ConsentManager";
import { createPageMetadata, organizationJsonLd } from "@/lib/seo/metadata";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = createPageMetadata({
  title: "Cyberbezpieczeństwo enterprise — pentesty, audyty, SOC, OT/ICS",
  description:
    "SprintTech — pentesty, audyty NIS2/DORA/KSC, SOC 24/7, bezpieczeństwo OT/ICS i dostosowanie dokumentacji. Certyfikat ISO/IEC 27001:2022.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = organizationJsonLd();

  return (
    <html lang="pl" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cyber-cyan focus:px-4 focus:py-2 focus:text-navy-950"
        >
          Przejdź do treści
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ConsentManager />
        <LinkedInInsightTag />
      </body>
    </html>
  );
}
