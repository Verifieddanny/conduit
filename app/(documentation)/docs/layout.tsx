import Footer from "@/components/footer";
import Navbar from "@/components/docs/navbar";
import Header from "@/components/docs/header";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-plex">
            <Navbar />
            <Header />
            {children}
            <Footer />
        </div>
    );
}
