'use client'

import { useState } from "react"
import { ChevronDown, Search, ShoppingCart, Menu, X } from "lucide-react"
import Image from "next/image"
import Router from 'next/router'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()

  const handellogin = () => {
    router.push('/login')
  }
const handlecontact = (e) => {
    e.preventDefault();
    // Use smooth scrolling to the footer element
    const footer = document.getElementById('footer');
    if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback if element not found on current page
        router.push('/#footer');
    }
}
  return (
    <nav className="bg-white mt-2 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
           <Image src="/Group 50.png" alt="Fudo Logo" width={125} height={45} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#EB5757] hover:text-red-600 font-medium transition-colors">
              Why Fudo?
            </a>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center space-x-1 text-[#333333] hover:text-gray-900 font-medium transition-colors"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Web Development
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Mobile Apps
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    UI/UX Design
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Consulting
                  </a>
                </div>
              )}
            </div>

            {/* Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-1 text-[#333333] hover:text-gray-900 font-medium transition-colors"
              >
                <span>Menu</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Pizza
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Burgers
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Pasta
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Desserts
                  </a>
                </div>
              )}
            </div>

            <a href="#" className="text-[#333333] hover:text-gray-900 font-medium transition-colors" onClick={handlecontact}>
              Contact
            </a>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart with Badge */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                2
              </span>
            </button>

            {/* Login Button */}
            <button className="bg-[#EB5757] hover:bg-red-600 text-white px-4 py-3 rounded-4xl font-medium transition-colors flex items-center space-x-2" onClick={handellogin}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Login</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-red-500 font-medium">
                Why Fudo?
              </a>

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-gray-700 font-medium"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      Web Development
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      Mobile Apps
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      UI/UX Design
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      Consulting
                    </a>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-between w-full text-gray-700 font-medium"
                >
                  <span>Menu</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                </button>
                {isMenuOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      Pizza
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      Burgers
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      Pasta
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">
                      Desserts
                    </a>
                  </div>
                )}
              </div>

              <a href="#" className="text-gray-700 font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
