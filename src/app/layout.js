import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import Script from "next/script";
import Head from "next/head";

export const metadata = {
  title: "Arbaz Murme | Portfolio",
  description:
    "Explore the portfolio of Arbaz Murme, a skilled React JS Developer, showcasing projects in web development, design, and more, arbazmurme, arbaj murme. arbaz murme, arbaz murame.",
  keywords:
    "Arbaz Murme, arbaj murme, arbazmurme, React JS Developer, Portfolio, Web Development, JavaScript, HTML, CSS, Solapur it company vacancy, Companies in Solapur MIDC, Mnc company in Solapur, Avo Automation Solapur, Solapur IT company news, Solapur it company salary, Solapur it company list, Solapur it company vacancy,it park in solapur.",
  openGraph: {
    title: "Arbaz Murme | Portfolio",
    description:
      "Discover the creative and technical work of Arbaz Murme in this online portfolio, featuring web development projects and design work.",
    url: "https://arbazmurme.vercel.app/",
    images: [
      {
        url: "/arbazmurme.webp",
        width: 800,
        height: 600,
        alt: "Portfolio Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Murme | Portfolio",
    description:
      "View the portfolio of Arbaz Murme, a talented React JS Developer, and explore his projects and designs.",
    images: ["/arbazmurme.webp"],
  },
  url: "https://arbazmurme.vercel.app/",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Meta Title */}
        <title>My Portfolio | Arbaz Murme - React JS Developer</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore the professional portfolio of Arbaz Murme, a skilled React JS Developer with expertise in web development, design, and more."
        />

        {/* Canonical Tag */}
        <link rel="canonical" href="https://arbazmurme.vercel.app/" />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="Arbaz Murme, React JS Developer, Web Development, Portfolio, JavaScript, HTML, CSS, Frontend Developer"
        />

        {/* Open Graph (OG) Tags */}
        <meta
          property="og:title"
          content="My Portfolio | Arbaz Murme - React JS Developer"
        />
        <meta
          property="og:description"
          content="Discover the creative and technical work of Arbaz Murme in this online portfolio, featuring web development projects and design work."
        />
        <meta
          property="og:image"
          content="https://arbazmurme.vercel.app/arbazmurme.webp"
        />
        <meta property="og:url" content="https://arbazmurme.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="My Portfolio | Arbaz Murme - React JS Developer"
        />
        <meta
          name="twitter:description"
          content="View the portfolio of Arbaz Murme, a talented React JS Developer, and explore his projects and designs."
        />
        <meta
          name="twitter:image"
          content="https://arbazmurme.vercel.app/arbazmurme.webp"
        />
      </Head>

      <body>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GJ855RZWML"
        />
        <Script
          id="ga-setup"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GJ855RZWML');
            `,
          }}
        />
        <ThemeProvider>
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
