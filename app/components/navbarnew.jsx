"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, Bell, MapPin, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ cartCount = 2, currentPage = "menu" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isProfileDropdownOpen && !e.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isProfileDropdownOpen]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/Group 50.png" alt="Fudo Logo" width={125} height={45} />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {["menu", "orders", "favorites"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  currentPage === item
                    ? "text-[#EB5757] bg-red-50"
                    : "text-gray-600 hover:text-[#EB5757] hover:bg-red-50/50"
                }`}
              >
                {item === "menu" ? "Menu" : item === "orders" ? "My Orders" : "Favorites"}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-5">
            {/* Location */}
            <div className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-[#EB5757] transition-colors duration-200 cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold">New York</span>
            </div>

            {/* Notifications */}
            <Link href="/notification">
              <button className="relative p-2 rounded-full text-gray-600 hover:text-[#EB5757] hover:bg-red-50 transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-[#EB5757] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  3
                </span>
              </button>
            </Link>
            
            {/* Shopping Cart */}
            <Link href="/cart">
              <button className="relative p-2 rounded-full text-gray-600 hover:text-[#EB5757] hover:bg-red-50 transition-all duration-200">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EB5757] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-red-50 text-gray-600 hover:text-[#EB5757] transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#EB5757] to-[#f87171] rounded-full flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  John D
                </span>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                  {["Profile", "Settings", "History"].map((item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#EB5757] transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                  <hr className="my-1" />
                  <button
                    className="flex w-full text-left px-4 py-2 text-sm text-[#EB5757] hover:bg-red-50 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-600 hover:text-[#EB5757] hover:bg-red-50 transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {["Menu", "My Orders", "Favorites"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#EB5757] hover:bg-red-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
