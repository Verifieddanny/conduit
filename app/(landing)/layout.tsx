import { Inter, Space_Grotesk, JetBrains_Mono, IBM_Plex_Sans, IBM_Plex_Sans_KR } from "next/font/google";
import "../globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

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
      <body className="min-h-full flex flex-col no-scrollbar">
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
