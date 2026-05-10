import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Roboto } from "next/font/google";
import JsonLd from "@/components/JsonLd";

const siteUrl = "https://arbazmurme.vercel.app";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arbaz Murme | portfolio",
    template: "%s | Arbaz Murme",
  },
  description:
    "Explore the portfolio of Arbaz Murme, a skilled React JS & MERN Stack Developer. Showcasing modern web development projects, creative design, and frontend expertise.",
  keywords:
    "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arbaz Murme | portfolio",
    description:
      "Explore the portfolio of Arbaz Murme, a skilled React JS & MERN Stack Developer. Showcasing modern web development projects, creative design, and frontend expertise.",
    url: siteUrl,
    images: [
      {
        url: "/arbazmurme.webp",
        width: 800,
        height: 600,
        alt: "portfolio Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Murme | portfolio",
    description:
      "Explore the portfolio of Arbaz Murme, a skilled React JS & MERN Stack Developer. Showcasing modern web development projects, creative design, and frontend expertise.",
    images: ["/arbazmurme.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
 verification: {
    google: "cEwTHdp8IYoodDwoa8Ks5lVDRMssdeZMYN7KZJzaG8Y",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffb400",
};

export default function RootLayout({ children }) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Arbaz Murme Portfolio",
    url: siteUrl,
    inLanguage: "en",
  };

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arbaz Murme",
    url: siteUrl,
    jobTitle: "MERN Stack Developer",
    sameAs: [
      "https://www.linkedin.com/in/arbaj-murme-4493031a3/",
      "https://github.com/arbazmurme",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.variable}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <GoogleAnalytics gaId="G-GJ855RZWML" />
        <JsonLd data={jsonLdWebsite} />
        <JsonLd data={jsonLdPerson} />
        <ThemeProvider>
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
