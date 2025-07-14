"use client"

import { useState } from "react"
import { Bell, Check, Trash2, ChefHat, Truck, Gift, Star, AlertCircle, Clock } from "lucide-react"
import Navbar from "../components/navbarnew"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order_confirmed",
      title: "Order Confirmed",
      message: "Your order #FD-2024-001 has been confirmed and is being prepared.",
      time: "2024-01-15T14:30:00",
      read: false,
      icon: "check",
      color: "green",
    },
    {
      id: 2,
      type: "preparing",
      title: "Meal Being Prepared",
      message: "Our chef is now preparing your delicious Classic Burger and French Fries.",
      time: "2024-01-15T14:35:00",
      read: false,
      icon: "chef",
      color: "yellow",
    },
    {
      id: 3,
      type: "ready_for_pickup",
      title: "Order Ready",
      message: "Your order is ready and waiting for pickup by our delivery driver.",
      time: "2024-01-15T15:05:00",
      read: false,
      icon: "clock",
      color: "purple",
    },
    {
      id: 4,
      type: "out_for_delivery",
      title: "Out for Delivery",
      message: "Your order is on its way! Driver Mike Johnson will deliver it in 10-15 minutes.",
      time: "2024-01-15T15:10:00",
      read: false,
      icon: "truck",
      color: "blue",
    },
    {
      id: 5,
      type: "delivered",
      title: "Order Delivered",
      message: "Your order #FD-2024-002 has been successfully delivered. Enjoy your meal!",
      time: "2024-01-15T13:45:00",
      read: true,
      icon: "check",
      color: "green",
    },
    {
      id: 6,
      type: "promotion",
      title: "Special Offer",
      message: "🎉 Get 20% off your next pizza order! Use code PIZZA20. Valid until tomorrow.",
      time: "2024-01-15T12:00:00",
      read: true,
      icon: "gift",
      color: "red",
    },
    {
      id: 7,
      type: "review_request",
      title: "Rate Your Experience",
      message: "How was your recent order? Share your feedback and help us improve.",
      time: "2024-01-15T11:30:00",
      read: true,
      icon: "star",
      color: "yellow",
    },
    {
      id: 8,
      type: "delay",
      title: "Delivery Delay",
      message: "Your order might be delayed by 10-15 minutes due to high demand. Sorry for the inconvenience!",
      time: "2024-01-14T19:20:00",
      read: true,
      icon: "alert",
      color: "orange",
    },
  ])

  const [filter, setFilter] = useState("all")

  const getIcon = (iconType) => {
    switch (iconType) {
      case "check":
        return <Check className="w-5 h-5" />
      case "chef":
        return <ChefHat className="w-5 h-5" />
      case "truck":
        return <Truck className="w-5 h-5" />
      case "gift":
        return <Gift className="w-5 h-5" />
      case "star":
        return <Star className="w-5 h-5" />
      case "alert":
        return <AlertCircle className="w-5 h-5" />
      case "clock":
        return <Clock className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getIconColor = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-600"
      case "yellow":
        return "bg-yellow-100 text-yellow-600"
      case "blue":
        return "bg-blue-100 text-blue-600"
      case "red":
        return "bg-red-100 text-red-600"
      case "purple":
        return "bg-purple-100 text-purple-600"
      case "orange":
        return "bg-orange-100 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read
    if (filter === "orders")
      return ["order_confirmed", "preparing", "ready_for_pickup", "out_for_delivery", "delivered", "delay"].includes(
        notif.type,
      )
    if (filter === "promotions") return notif.type === "promotion"
    return true
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-[#EB5757] text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Mark All Read
              </button>
            )}
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: "all", label: "All" },
              { key: "unread", label: "Unread" },
              { key: "orders", label: "Orders" },
              { key: "promotions", label: "Promotions" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key ? "bg-white text-[#EB5757] shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
                {tab.key === "unread" && unreadCount > 0 && (
                  <span className="ml-2 bg-[#EB5757] text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No notifications</h2>
            <p className="text-gray-600">
              {filter === "unread" ? "All notifications have been read" : "You're all caught up!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl ${
                  !notification.read ? "border-l-4 border-[#EB5757]" : ""
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${getIconColor(notification.color)}`}>
                    {getIcon(notification.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </h3>
                        <p className={`mt-1 ${!notification.read ? "text-gray-700" : "text-gray-600"}`}>
                          {notification.message}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">{formatTime(notification.time)}</p>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-[#EB5757] transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete notification"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {!notification.read && (
                      <div className="mt-3">
                        <div className="w-2 h-2 bg-[#EB5757] rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
