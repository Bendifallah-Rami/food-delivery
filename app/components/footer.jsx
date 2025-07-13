"use client"

import { Instagram, Facebook, Twitter, Send } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setEmail("")
  }

  return (
    <footer className="bg-white py-8 sm:py-12 mt-6 lg:py-16 px-4 border-t border-gray-200" id="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="bg-red-500 text-white px-2 py-1 rounded font-bold text-sm">FUDO</div>
              <span className="font-bold text-xl">Fudo</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our job is to filling your tummy with delicious food and with fast and free delivery.
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Facebook className="w-4 h-4 text-gray-600" />
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Twitter className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-900">About</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Menu
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Why Fudo?
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Partner With Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold text-gray-900">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4 text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-gray-900">Get in Touch</h3>
            <p className="text-sm text-gray-600">Question or feedback?</p>
            <p className="text-sm text-gray-600">We'd love to hear from you</p>
            <form onSubmit={handleEmailSubmit} className="flex max-w-sm mx-auto sm:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-l-full text-sm focus:outline-none focus:border-red-500"
                required
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-r-full transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
