import Footer from "@/components/footer";
import "../../globals.css";
import Navbar from "@/components/docs/navbar";
import Header from "@/components/docs/header";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (

        <html lang="en">
            <body className="bg-[#0A0A0A] no-scrollbar font-plex">
                <Navbar />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}