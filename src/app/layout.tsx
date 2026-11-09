import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./consultation.css";
import "./forms.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL } from "@/lib/format";
import { BRAND_NAME as SITE_NAME } from "@/lib/site";
import { ConsultationWidget } from "@/components/consultation-widget";
import { FooterConsultation } from "@/components/footer-consultation";
import { HOME_DESCRIPTION, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({title: "Contabilitate și fiscalitate în România", description: HOME_DESCRIPTION, path: "/"}),
  applicationName: SITE_NAME,
  icons: {
    icon: [{url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon"}, {url: "/brand/contab-icon-96.png", sizes: "96x96", type: "image/png"}],
    apple: [{url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png"}],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101a24" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-latin-v5.3.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin-ext-v5.3.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Sari la conținut
          </a>
          <Header />
          {children}
          <FooterConsultation />
          <Footer />
          <ConsultationWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
