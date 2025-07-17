"use client"

import { Bell, Check, Trash2, ChefHat, Truck, Gift, Star, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming cn utility is available

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

const getIconColorClass = (color) => {
  switch (color) {
    case "green":
      return "text-green-600"
    case "yellow":
      return "text-yellow-600"
    case "blue":
      return "text-blue-600"
    case "red":
      return "text-primary-red"
    case "purple":
      return "text-purple-600"
    case "orange":
      return "text-orange-600"
    default:
      return "text-gray-600"
  }
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h ago`
  } else if (diffInSeconds < 86400 * 2) {
    return "Yesterday"
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }
}

export function NotificationItem({ notification, markAsRead, deleteNotification }) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-4 p-6 rounded-2xl shadow-sm transition-all duration-200",
        notification.read
          ? "bg-white hover:shadow-md"
          : "bg-primary-red/5 border border-primary-red/10 hover:shadow-md",
      )}
    >
      {!notification.read && (
        <span className="absolute top-3 right-3 w-2 h-2 bg-primary-red rounded-full animate-pulse" aria-hidden="true" />
      )}
      <div className={cn("p-3 rounded-full", getIconColorClass(notification.color), "bg-gray-100")}>
        {getIcon(notification.icon)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={cn("text-lg font-semibold", notification.read ? "text-gray-800" : "text-gray-900")}>
            {notification.title}
          </h3>
          <p className={cn("text-sm", notification.read ? "text-gray-600" : "text-gray-700")}>{notification.message}</p>
          <span className="text-sm text-gray-500">{formatTime(notification.time)}</span>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          {!notification.read && (
            <button
              onClick={() => markAsRead(notification.id)}
              className="flex items-center text-sm text-gray-500 hover:text-primary-red transition-colors"
              aria-label="Mark as read"
            >
              <Check className="w-4 h-4 mr-1" />
              Mark as Read
            </button>
          )}
          <button
            onClick={() => deleteNotification(notification.id)}
            className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Delete notification"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
