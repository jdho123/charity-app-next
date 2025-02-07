'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NavLink from '@/components/navigation/NavLink'
import Dropdown from '@/components/navigation/Dropdown'
import DropdownLink from '@/components/navigation/DropdownLink'
import Image from 'next/image'

interface AuthenticatedLayoutProps {
  user: {
    name: string;
  };
  children: React.ReactNode;
  header?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ user, header, children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <div className="relative w-12 h-12">
                    <Image 
                      src="/images/worldMini2.png" 
                      alt="LEDU Logo"
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-radial from-white/60 via-white/30 to-transparent rounded-full" />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-gloria">
                      LEDU
                    </span>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink 
                  href="/dashboard" 
                  active={pathname === '/dashboard'}
                >
                  Dashboard
                </NavLink>
              </div>
            </div>

            {/* Settings Dropdown */}
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">
                <Dropdown 
                  align="right" 
                  width="48"
                  trigger={
                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                      <div>{user.name}</div>
                      <div className="ml-1">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  }
                >
                  <DropdownLink href="/profile">Profile</DropdownLink>
                  <DropdownLink href="/logout" method="post">Log Out</DropdownLink>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Heading */}
      {header && (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      {/* Page Content */}
    </div>
  );
};

export default AuthenticatedLayout;