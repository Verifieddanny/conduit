import { Inter, IBM_Plex_Sans, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

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

export const metadata = {
  metadataBase: new URL("https://conduit-delivery.vercel.app"),
  title: "Conduit | Reliable Webhook Delivery & Management",
  description: "Conduit ensures your webhooks are delivered reliably with automatic retries, exponential backoff, and dead-letter queues. Integrated simulator and detailed analytics for developers.",
  keywords: ["webhook", "delivery", "reliability", "developer tools", "API", "retries", "dead-letter queue"],
  openGraph: {
    title: "Conduit | Reliable Webhook Delivery",
    description: "Built for engineers who need 100% webhook reliability.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Conduit - Webhook Delivery Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conduit | Reliable Webhook Delivery",
    description: "Built for engineers who need 100% webhook reliability.",
    images: ["/og-image.jpg"],
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
