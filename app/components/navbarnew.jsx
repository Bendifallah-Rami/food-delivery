"use client";

import { useState } from "react";
import { ShoppingCart, User, Menu, Bell, MapPin } from "lucide-react";
import Link from "next/link";

export default function Navbar({ cartCount = 2, currentPage = "menu" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/menu" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#EB5757] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FD</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Fudo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/menu"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "menu"
                  ? "text-[#EB5757] bg-red-50"
                  : "text-gray-700 hover:text-[#EB5757]"
              }`}
            >
              Menu
            </Link>
            <Link
              href="/orders"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "orders"
                  ? "text-[#EB5757] bg-red-50"
                  : "text-gray-700 hover:text-[#EB5757]"
              }`}
            >
              My Orders
            </Link>
            <Link
              href="/favorites"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "favorites"
                  ? "text-[#EB5757] bg-red-50"
                  : "text-gray-700 hover:text-[#EB5757]"
              }`}
            >
              Favorites
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden sm:flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">New York, NY</span>
            </div>

            {/* Notifications */}
            <Link href="/notification">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  3
                </span>
              </button>
            </Link>
            {/* Shopping Cart */}
            <Link href="/cart">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-[#EB5757] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  John Doe
                </span>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Order History
                  </Link>
                  <hr className="my-1" />
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      // Handle logout
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="/menu"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#EB5757] hover:bg-gray-50"
              >
                Menu
              </Link>
              <Link
                href="/orders"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#EB5757] hover:bg-gray-50"
              >
                My Orders
              </Link>
              <Link
                href="/favorites"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#EB5757] hover:bg-gray-50"
              >
                Favorites
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
