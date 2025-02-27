
import Footer from "./Footer";
import SlideMenu from "./SlideMenu";
import LeduLogo from "./LeduLogo";

interface GuestLayoutProps {
    children: React.ReactNode;
  }
  
  export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
      <div className="min-h-screen">
        <div className="absolute top-4 left-4 z-40">
          <LeduLogo />
        </div>
        <SlideMenu />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }