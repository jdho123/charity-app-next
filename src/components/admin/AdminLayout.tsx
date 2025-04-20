'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import GloriaTitle from '@/components/shared/GloriaTitle';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
      ? 'text-blue-600 font-medium'
      : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/admin" className="mr-8">
              <GloriaTitle as="h1" size="2xl" color="black">
                Admin Dashboard
              </GloriaTitle>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/admin/stories"
                className={`px-2 py-1 hover:text-blue-600 transition-colors ${isActive('/admin/stories')}`}
              >
                Stories
              </Link>
              <Link
                href="/admin/campaigns"
                className={`px-2 py-1 hover:text-blue-600 transition-colors ${isActive('/admin/campaigns')}`}
              >
                Campaigns
              </Link>
              <Link
                href="/admin/campaigns/categories"
                className={`px-2 py-1 hover:text-blue-600 transition-colors ${isActive('/admin/campaigns/categories')}`}
              >
                Categories
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Visit site link */}
            <Link
              href="/"
              className="hidden md:block text-gray-600 hover:text-gray-900 font-medium"
              target="_blank"
            >
              Visit Site
            </Link>

            <LogoutButton />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="flex flex-col py-2">
              <Link
                href="/admin/stories"
                className={`px-4 py-2 ${isActive('/admin/stories')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stories
              </Link>
              <Link
                href="/admin/campaigns"
                className={`px-4 py-2 ${isActive('/admin/campaigns')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Campaigns
              </Link>
              <Link
                href="/admin/campaigns/categories"
                className={`px-4 py-2 ${isActive('/admin/campaigns/categories')}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/"
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Visit Site
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <Breadcrumbs pathname={pathname} />
        </div>
      </div>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Admin Panel • All rights reserved
        </div>
      </footer>
    </div>
  );
}

// Helper component for breadcrumbs
function Breadcrumbs({ pathname }: { pathname: string | null }) {
  if (!pathname) return null;

  // Skip breadcrumbs for the main admin page
  if (pathname === '/admin') return null;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    // Skip 'admin' segment in the breadcrumbs
    if (index === 0 && segment === 'admin') return null;

    // Format the segment for display
    const displayName = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

    // Calculate the href for this breadcrumb
    const href = `/${segments.slice(0, index + 1).join('/')}`;

    // Last segment doesn't need a link
    const isLast = index === segments.length - 1;

    return (
      <li key={segment} className="flex items-center">
        {/* Separator for all but first item */}
        {index > 0 && <span className="mx-2 text-gray-400">/</span>}

        {/* Breadcrumb link or text */}
        {isLast ? (
          <span className="font-medium text-gray-800">{displayName}</span>
        ) : (
          <Link href={href} className="text-blue-600 hover:text-blue-800">
            {displayName}
          </Link>
        )}
      </li>
    );
  });

  return (
    <nav>
      <ol className="flex text-sm">
        <li>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            Dashboard
          </Link>
        </li>
        <span className="mx-2 text-gray-400">/</span>
        {breadcrumbs}
      </ol>
    </nav>
  );
}
