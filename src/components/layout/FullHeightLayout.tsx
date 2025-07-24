'use client';
import SlideMenu from './SlideMenu';
import LeduLogo from './LeduLogo';

interface FullHeightLayoutProps {
  children: React.ReactNode;
}

export default function FullHeightLayout({ children }: FullHeightLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <div className="absolute top-4 left-4 z-40">
        <LeduLogo />
      </div>
      <SlideMenu />
      <main className="flex-1">{children}</main>
    </div>
  );
}
