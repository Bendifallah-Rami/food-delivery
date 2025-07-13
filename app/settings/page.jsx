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
} from "lucide-react"
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
    // Handle logout logic
    console.log("Logging out...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="settings" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Profile Information</h3>
                    <p className="text-gray-600 text-sm">Update your personal details</p>
                  </div>
                </div>
                <button className="text-[#EB5757] hover:text-red-600 transition-colors">Edit</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Delivery Addresses</h3>
                    <p className="text-gray-600 text-sm">Manage your saved addresses</p>
                  </div>
                </div>
                <button className="text-[#EB5757] hover:text-red-600 transition-colors">Manage</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Payment Methods</h3>
                    <p className="text-gray-600 text-sm">Add or remove payment options</p>
                  </div>
                </div>
                <button className="text-[#EB5757] hover:text-red-600 transition-colors">Manage</button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Order Updates</h3>
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Promotions & Offers</h3>
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                    <p className="text-gray-600 text-sm">Receive text messages for important updates</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) => updateSetting("notifications", "sms", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* App Preferences */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">App Preferences</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {settings.preferences.theme === "light" ? (
                    <Sun className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">Theme</h3>
                    <p className="text-gray-600 text-sm">Choose your preferred theme</p>
                  </div>
                </div>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => updateSetting("preferences", "theme", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Language</h3>
                    <p className="text-gray-600 text-sm">Select your preferred language</p>
                  </div>
                </div>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => updateSetting("preferences", "language", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy & Security</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Change Password</h3>
                    <p className="text-gray-600 text-sm">Update your account password</p>
                  </div>
                </div>
                <button className="text-[#EB5757] hover:text-red-600 transition-colors">Change</button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Data Sharing</h3>
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Support & Help */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Support & Help</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Help Center</h3>
                    <p className="text-gray-600 text-sm">Find answers to common questions</p>
                  </div>
                </div>
                <button className="text-[#EB5757] hover:text-red-600 transition-colors">Visit</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Contact Support</h3>
                    <p className="text-gray-600 text-sm">Get help from our support team</p>
                  </div>
                </div>
                <button className="text-[#EB5757] hover:text-red-600 transition-colors">Contact</button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">About</h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#EB5757] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">FD</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Fudo</h3>
                  <p className="text-gray-600">Your favorite food delivery app</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Version</h4>
                  <p className="text-gray-600">2.1.0</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Last Updated</h4>
                  <p className="text-gray-600">January 15, 2024</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#EB5757] to-red-600 rounded-lg text-white">
                <h4 className="font-bold mb-2">👨‍💻 Developer Information</h4>
                <p className="text-red-100 text-sm mb-2">Developed with ❤️ by the Fudo Development Team</p>
                <div className="space-y-1 text-sm">
                  <p className="text-red-100">• Built with Next.js & React</p>
                  <p className="text-red-100">• Styled with Tailwind CSS</p>
                  <p className="text-red-100">• Designed for optimal user experience</p>
                </div>
                <div className="mt-3 pt-3 border-t border-red-400">
                  <p className="text-xs text-red-200">
                    © 2024 Fudo. All rights reserved. Made with passion for great food and technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
