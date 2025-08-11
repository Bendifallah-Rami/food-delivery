"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ChefHat, 
  Truck, 
  Bell, 
  Menu as MenuIcon, 
  X,
  AlertTriangle,
  CheckCircle,
  Package,
  Clock
} from "lucide-react"
import { useStaff } from "../context/StaffContext"

export default function StaffNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { getOrderStats } = useStaff()
  
  const stats = getOrderStats()

  const navItems = [
    {
      href: "/staff/meals",
      label: "Kitchen",
      icon: ChefHat,
      badge: stats.pending + stats.confirmed + stats.preparing,
      badgeColor: "bg-orange-500"
    },
    {
      href: "/staff/delivery",
      label: "Delivery",
      icon: Truck,
      badge: stats.ready + stats.assigned + stats.outForDelivery,
      badgeColor: "bg-blue-500"
    },
    {
      href: "/staff/notifications",
      label: "Notifications",
      icon: Bell,
      badge: stats.unreadNotifications,
      badgeColor: "bg-red-500"
    }
  ]

  const isActive = (href) => pathname === href

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <ChefHat className="w-6 h-6 text-[#EB5757]" />
            <span className="font-bold text-gray-900">Staff Portal</span>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center space-x-4">
            {stats.pending > 0 && (
              <div className="flex items-center space-x-1 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-600 font-medium">{stats.pending}</span>
              </div>
            )}
            {stats.unreadNotifications > 0 && (
              <div className="flex items-center space-x-1 text-sm">
                <Bell className="w-4 h-4 text-red-500" />
                <span className="text-red-600 font-medium">{stats.unreadNotifications}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white border-t">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-4 border-b hover:bg-gray-50 ${
                  isActive(item.href) ? 'bg-[#EB5757]/5 border-r-4 border-r-[#EB5757]' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${isActive(item.href) ? 'text-[#EB5757]' : 'text-gray-600'}`} />
                  <span className={`font-medium ${isActive(item.href) ? 'text-[#EB5757]' : 'text-gray-900'}`}>
                    {item.label}
                  </span>
                </div>
                {item.badge > 0 && (
                  <span className={`${item.badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <ChefHat className="w-8 h-8 text-[#EB5757]" />
              <span className="font-bold text-xl text-gray-900">Staff Portal</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                    isActive(item.href) 
                      ? 'bg-[#EB5757]/10 text-[#EB5757]' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge > 0 && (
                    <span className={`${item.badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium ml-2`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Stats Dashboard */}
            <div className="flex items-center space-x-6 bg-gray-50 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600">Pending:</span>
                <span className="font-bold text-yellow-600">{stats.pending}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">Active:</span>
                <span className="font-bold text-orange-600">{stats.confirmed + stats.preparing}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Package className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">Ready:</span>
                <span className="font-bold text-green-600">{stats.ready}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
