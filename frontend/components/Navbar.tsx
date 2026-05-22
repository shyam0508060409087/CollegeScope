'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Search, Heart, Menu, X, GraduationCap, LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              CollegeScope
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/colleges"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              Explore
            </Link>
            <Link
              href="/compare"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              Compare
            </Link>
            <Link
              href="/saved"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4" />
              Saved
            </Link>
          </div>

          {/* Auth + Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/colleges"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              <Link href="/colleges" className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" onClick={() => setMobileOpen(false)}>
                Explore Colleges
              </Link>
              <Link href="/compare" className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" onClick={() => setMobileOpen(false)}>
                Compare
              </Link>
              <Link href="/saved" className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <Heart className="w-4 h-4" /> Saved
              </Link>
              <div className="border-t border-gray-100 mt-2 pt-2">
                {session?.user ? (
                  <div className="px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{session.user.name || session.user.email}</span>
                    </div>
                    <button onClick={() => signOut()} className="text-sm text-red-500 hover:text-red-700">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="block px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
