"use client"

import { useState, useCallback } from "react"
import { 
  Bell, 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Info,
  User,
  Phone,
  DollarSign,
  Filter,
  Check,
  Trash2
} from "lucide-react"
import { useStaff } from "../context/StaffContext"

export default function StaffNotifications() {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    deleteNotification 
  } = useStaff()
  
  const [filter, setFilter] = useState("all")
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  const showToast = useCallback((message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
    }, 3000)
  }, [])

  // Wrapper functions to add toast notifications
  const handleMarkAsRead = (notificationId) => {
    markNotificationRead(notificationId)
    showToast("Notification marked as read", "success")
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsRead()
    showToast("All notifications marked as read", "success")
  }

  const handleDeleteNotification = (notificationId) => {
    deleteNotification(notificationId)
    showToast("Notification deleted", "success")
  }

  const clearAllNotifications = () => {
    // Filter out all notifications
    notifications.forEach(notification => {
      deleteNotification(notification.id)
    })
    showToast("All notifications cleared", "success")
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order_confirmed":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "order_rejected":
        return <AlertTriangle className="w-6 h-6 text-red-500" />
      case "cooking_started":
        return <Package className="w-6 h-6 text-blue-500" />
      case "order_ready":
        return <Bell className="w-6 h-6 text-orange-500" />
      case "delivery_assigned":
        return <Truck className="w-6 h-6 text-purple-500" />
      case "delivery_started":
        return <MapPin className="w-6 h-6 text-indigo-500" />
      case "delivery_completed":
        return <CheckCircle className="w-6 h-6 text-green-600" />
      default:
        return <Info className="w-6 h-6 text-gray-400" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    if (filter === "high") return notification.priority === "high"
    return notification.type === filter
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg border ${
          toast.type === "success" 
            ? "bg-green-50 text-green-800 border-green-200" 
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          <div className="flex items-center space-x-2">
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span className="font-poppins font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="p-4 md:p-8 lg:p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-6">
            <div className="text-sm flex items-center text-gray-600 font-poppins">
              <span>Staff</span>
              <span className="mx-2 text-lg">›</span>
              <span>Notifications</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#333333] font-poppins">
                  Order Notifications
                </h1>
                <p className="text-gray-600 font-poppins mt-2">
                  Track order progress from confirmation to delivery
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="bg-[#EB5757] text-white px-3 py-1 rounded-full text-sm font-poppins">
                  {unreadCount} unread
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 font-poppins">Filter:</span>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All" },
                  { value: "unread", label: "Unread" },
                  { value: "high", label: "High Priority" },
                  { value: "order_confirmed", label: "Confirmed" },
                  { value: "order_ready", label: "Ready" },
                  { value: "order_delivered", label: "Delivered" }
                ].map((filterOption) => (
                  <button
                    key={filterOption.value}
                    onClick={() => setFilter(filterOption.value)}
                    className={`px-3 py-1 rounded-full text-sm font-poppins transition-colors ${
                      filter === filterOption.value
                        ? "bg-[#EB5757] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-poppins"
              >
                <Check className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
              
              <button
                onClick={clearAllNotifications}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-poppins"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 hover:shadow-md transition-all duration-200 ${
                getPriorityColor(notification.priority)
              } ${!notification.read ? 'border-r-4 border-r-[#EB5757]' : ''}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-bold font-poppins text-lg ${
                          !notification.read ? 'text-[#333333]' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 font-poppins">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-[#EB5757] rounded-full"></div>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 font-poppins mb-4">
                        {notification.message}
                      </p>

                      {/* Order Details */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-poppins text-gray-600">Order:</span>
                            <span className="text-sm font-poppins font-medium text-[#333333]">
                              {notification.orderId}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-poppins text-gray-600">Customer:</span>
                            <span className="text-sm font-poppins font-medium text-[#333333]">
                              {notification.customerName}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-poppins text-gray-600">Amount:</span>
                            <span className="text-sm font-poppins font-medium text-[#333333]">
                              {notification.totalAmount}
                            </span>
                          </div>
                        </div>

                        {/* Additional Info */}
                        {notification.driverName && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Truck className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-poppins text-gray-600">Driver:</span>
                            <span className="text-sm font-poppins font-medium text-[#333333]">
                              {notification.driverName}
                            </span>
                          </div>
                        )}

                        {notification.estimatedDelivery && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-poppins text-gray-600">Est. Delivery:</span>
                            <span className="text-sm font-poppins font-medium text-[#333333]">
                              {notification.estimatedDelivery}
                            </span>
                          </div>
                        )}

                        {notification.delayReason && (
                          <div className="flex items-center space-x-2 mt-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-poppins text-red-600">Delay Reason:</span>
                            <span className="text-sm font-poppins font-medium text-red-700">
                              {notification.delayReason}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 font-poppins">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{notification.customerPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 font-poppins mb-2">
              No Notifications
            </h3>
            <p className="text-gray-500 font-poppins">
              {filter === "all" 
                ? "No notifications available at the moment." 
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        )}

        {/* Summary Stats */}
        {notifications.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-bold text-[#333333] font-poppins mb-4">
              Notification Summary
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#EB5757] font-poppins">
                  {notifications.length}
                </div>
                <div className="text-sm text-gray-600 font-poppins">Total</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 font-poppins">
                  {unreadCount}
                </div>
                <div className="text-sm text-gray-600 font-poppins">Unread</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 font-poppins">
                  {notifications.filter(n => n.priority === "high").length}
                </div>
                <div className="text-sm text-gray-600 font-poppins">High Priority</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 font-poppins">
                  {notifications.filter(n => n.type === "order_delivered").length}
                </div>
                <div className="text-sm text-gray-600 font-poppins">Delivered</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}