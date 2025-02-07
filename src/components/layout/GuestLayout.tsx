import Header from "./Header";
import Footer from "./Footer";

interface GuestLayoutProps {
    children: React.ReactNode;
  }
  
  export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }