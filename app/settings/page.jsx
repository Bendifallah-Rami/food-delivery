"use client"

import { useState } from "react"
import {
  Bell,
  Lock,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Shield,
  HelpCircle,
  User,
  MapPin,
  CreditCard,
  LogOut,
  Settings,
  ArrowRight,
  Star,
  Zap,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Navbar from "../components/navbarnew"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      sms: false,
    },
    privacy: {
      profileVisibility: "private",
      dataSharing: false,
      analytics: true,
    },
    preferences: {
      theme: "light",
      language: "en",
      currency: "USD",
    },
  })

  const updateSetting = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  const handleLogout = () => {
    console.log("Logging out...")
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden font-poppins">
      <Navbar currentPage="settings" />

      {/* Hero-style Header Section */}
      <section className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col lg:flex-row items-center justify-between py-4 ">
            {/* Left Content */}
            <div className="flex-1 lg:pr-12 z-10">
              {/* Badge */}
              <div className="inline-flex items-center bg-[#FEE9DE] text-[#EB5757] px-5 py-3 rounded-full text-sm font-medium mb-5">
                <span>Customize Experience</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-[#333333] leading-tight mb-6">
                Your
                <span className="text-[#EB5757]">Settings</span>
                Control Center
              </h1>

              {/* Description */}
              <p className="text-lg text-[#333333] font-medium mb-8 ">
                Personalize your experience, manage notifications, and secure your account with our comprehensive settings
              </p>

           
                <button className="bg-[#EB5757] hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Setup
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Settings */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-[#EB5757] rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-[#333333]">Account Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Profile Information</h3>
                      <p className="text-gray-600 text-sm">Update your personal details</p>
                    </div>
                  </div>
                  <button className="bg-[#EB5757] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-medium">
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Delivery Addresses</h3>
                      <p className="text-gray-600 text-sm">Manage your saved addresses</p>
                    </div>
                  </div>
                  <button className="bg-[#EB5757] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-medium">
                    Manage
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Payment Methods</h3>
                      <p className="text-gray-600 text-sm">Add or remove payment options</p>
                    </div>
                  </div>
                  <button className="bg-[#EB5757] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-medium">
                    Manage
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-[#EB5757] rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-[#333333]">Notifications</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-[#FEE9DE]/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Order Updates</h3>
                      <p className="text-gray-600 text-sm">Get notified about your order status</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.orderUpdates}
                      onChange={(e) => updateSetting("notifications", "orderUpdates", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#EB5757]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-[#FEE9DE]/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Promotions & Offers</h3>
                      <p className="text-gray-600 text-sm">Receive special deals and discounts</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.promotions}
                      onChange={(e) => updateSetting("notifications", "promotions", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#EB5757]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-[#FEE9DE]/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Email Notifications</h3>
                      <p className="text-gray-600 text-sm">Receive email notifications for important updates</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.sms}
                      onChange={(e) => updateSetting("notifications", "sms", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#EB5757]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-[#EB5757] rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-[#333333]">Privacy & Security</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Change Password</h3>
                      <p className="text-gray-600 text-sm">Update your account password</p>
                    </div>
                  </div>
                  <button className="bg-[#EB5757] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-medium">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-[#FEE9DE]/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Data Sharing</h3>
                      <p className="text-gray-600 text-sm">Allow sharing data for better experience</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.dataSharing}
                      onChange={(e) => updateSetting("privacy", "dataSharing", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#EB5757]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* App Preferences */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-[#EB5757] rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-[#333333]">Preferences</h3>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-[#EB5757] rounded-full flex items-center justify-center">
                      {settings.preferences.theme === "light" ? (
                        <Sun className="w-4 h-4 text-white" />
                      ) : (
                        <Moon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333]">Theme</h4>
                      <p className="text-gray-600 text-xs">Choose your preferred theme</p>
                    </div>
                  </div>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => updateSetting("preferences", "theme", e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#333333]">Language</h4>
                      <p className="text-gray-600 text-xs">Select your preferred language</p>
                    </div>
                  </div>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => updateSetting("preferences", "language", e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Support & Help */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-[#EB5757] rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-[#333333]">Support</h3>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-[#333333]">Help Center</h4>
                      <p className="text-gray-600 text-xs">Find answers to common questions</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#EB5757]" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-[#333333]">Contact Support</h4>
                      <p className="text-gray-600 text-xs">Get help from our support team</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#EB5757]" />
                </button>
              </div>
            </div>

            {/* About */}
            <div className="bg-gradient-to-br from-[#EB5757] to-red-600 rounded-3xl shadow-xl p-6 text-white">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-white rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold">About Fudo</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FD</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Fudo v2.1.0</h4>
                    <p className="text-red-100 text-sm">Your favorite food delivery app</p>
                  </div>
                </div>

                <div className="p-4 bg-white/10 rounded-xl">
                  <h5 className="font-semibold mb-2">👨‍💻 Developer Information</h5>
                  <p className="text-red-100 text-sm mb-2">Developed with ❤️ by the Fudo Team</p>
                  <div className="space-y-1 text-xs">
                    <p className="text-red-100">• Built with Next.js & React</p>
                    <p className="text-red-100">• Styled with Tailwind CSS</p>
                    <p className="text-red-100">• Designed for optimal UX</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-red-200">
                    © 2024 Fudo. All rights reserved.
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors border border-red-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}