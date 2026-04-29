import { Inter, IBM_Plex_Sans, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-plex-kr",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://conduit-delivery.vercel.app"),
  title: {
    default: "Conduit | Reliable Webhook Delivery & Management",
    template: "%s | Conduit",
  },
  description:
    "Conduit ensures 100% webhook reliability with automatic retries, exponential backoff, and dead-letter queues. The developer-first engine for reliable API event delivery.",
  keywords: [
    "Webhook Delivery",
    "API Reliability",
    "Dead Letter Queue",
    "Webhook Simulator",
    "Event-Driven Architecture",
    "Software Engineering",
    "Conduit"
  ],
  authors: [{ name: "Daniel Chigozirim Nwachukwu", url: "https://useshipyard.xyz" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Conduit — Webhooks You Can Trust.",
    description:
      "The bridge between your services. Monitor, simulate, and guarantee webhook delivery with real-time logs and automated retries.",
    url: "https://conduit-delivery.vercel.app",
    siteName: "Conduit",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Conduit Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conduit | Webhook Management for Engineers",
    description: "Built for engineers who need 100% webhook reliability. Live logs and instant retries.",
    creator: "@dannyclassi_c",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexSans.variable} ${ibmPlexSansKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col no-scrollbar bg-[#0A0A0A] text-white">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
