"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../../components/dashboard/sidebar"
import Toast from "../../components/form_components/toast"
import DropdownField from "../../components/form_components/dropdown_field"
import FormSection from "../../components/form_components/form_section"
import { 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  X,
  MoreVertical,
  Clock,
  User,
  ShoppingBag,
  Users,
  Settings,
  TrendingUp,
  AlertTriangle,
  Filter,
  Search,
  MarkAsRead,
  Trash2,
  Archive
} from "lucide-react"

export default function NotificationPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // State for notification filters
  const [filters, setFilters] = useState({
    type: "All Types",
    status: "All Status",
    priority: "All Priorities"
  })

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // State for selected notifications
  const [selectedNotifications, setSelectedNotifications] = useState([])

  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-2024-001 has been placed by John Doe",
      priority: "high",
      status: "unread",
      timestamp: "2024-07-19T10:30:00Z",
      icon: <ShoppingBag size={20} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      actionUrl: "/admin/orders/list"
    },
    {
      id: 2,
      type: "system",
      title: "System Update Available",
      message: "A new system update (v2.1.0) is available for installation",
      priority: "medium",
      status: "unread",
      timestamp: "2024-07-19T09:15:00Z",
      icon: <Settings size={20} />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      actionUrl: "/admin/settings"
    },
    {
      id: 3,
      type: "alert",
      title: "Low Stock Alert",
      message: "Classic Burger ingredients are running low (5 items remaining)",
      priority: "high",
      status: "unread",
      timestamp: "2024-07-19T08:45:00Z",
      icon: <AlertTriangle size={20} />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      actionUrl: "/admin/stock/list"
    },
    {
      id: 4,
      type: "user",
      title: "New User Registration",
      message: "Sarah Wilson has registered as a new customer",
      priority: "low",
      status: "read",
      timestamp: "2024-07-19T07:30:00Z",
      icon: <User size={20} />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actionUrl: "/admin/user/list"
    },
    {
      id: 5,
      type: "staff",
      title: "Staff Schedule Update",
      message: "Mike Davis has requested a schedule change for next week",
      priority: "medium",
      status: "read",
      timestamp: "2024-07-18T16:20:00Z",
      icon: <Users size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      actionUrl: "/admin/staff/list"
    },
    {
      id: 6,
      type: "revenue",
      title: "Daily Revenue Milestone",
      message: "Today's revenue has exceeded $2,500 target",
      priority: "low",
      status: "read",
      timestamp: "2024-07-18T14:00:00Z",
      icon: <TrendingUp size={20} />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actionUrl: "/admin/reports"
    },
    {
      id: 7,
      type: "order",
      title: "Order Cancelled",
      message: "Order #ORD-2024-002 has been cancelled by customer",
      priority: "medium",
      status: "read",
      timestamp: "2024-07-18T12:15:00Z",
      icon: <X size={20} />,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      actionUrl: "/admin/orders/list"
    },
    {
      id: 8,
      type: "system",
      title: "Backup Completed",
      message: "Daily database backup completed successfully",
      priority: "low",
      status: "read",
      timestamp: "2024-07-18T02:00:00Z",
      icon: <CheckCircle size={20} />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actionUrl: "/admin/settings"
    }
  ])

  const typeOptions = [
    "All Types",
    "Order",
    "System", 
    "Alert",
    "User",
    "Staff",
    "Revenue"
  ]

  const statusOptions = [
    "All Status",
    "Unread",
    "Read"
  ]

  const priorityOptions = [
    "All Priorities",
    "High",
    "Medium",
    "Low"
  ]

  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const showToast = useCallback((message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInSeconds = Math.floor((now - time) / 1000)
    
    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100"
      case "medium": return "text-orange-600 bg-orange-100"
      case "low": return "text-green-600 bg-green-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, status: "read" }
          : notif
      )
    )
    showToast("Notification marked as read", "success")
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, status: "read" }))
    )
    showToast("All notifications marked as read", "success")
  }

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    )
    showToast("Notification deleted", "success")
  }

  const handleNotificationClick = (notification) => {
    if (notification.status === "unread") {
      handleMarkAsRead(notification.id)
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filters.type === "All Types" || notification.type.toLowerCase() === filters.type.toLowerCase()
    const matchesStatus = filters.status === "All Status" || notification.status.toLowerCase() === filters.status.toLowerCase()
    const matchesPriority = filters.priority === "All Priorities" || notification.priority.toLowerCase() === filters.priority.toLowerCase()
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesType && matchesStatus && matchesPriority && matchesSearch
  })

  const unreadCount = notifications.filter(notif => notif.status === "unread").length
  const highPriorityCount = notifications.filter(notif => notif.priority === "high").length

  if (!isMounted) {
    return (
      <div className="flex min-h-screen bg-white overflow-hidden">
        <Sidebar activeItem="notifications" />
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 lg:p-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="notifications" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Notifications</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Notifications</h1>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <span className="bg-[#EB5757] text-white px-2 py-1 rounded-full text-sm font-poppins">
                        {unreadCount} unread
                      </span>
                    )}
                    {highPriorityCount > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-poppins">
                        {highPriorityCount} high priority
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleMarkAllAsRead}
                  className="bg-[#EB5757] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Mark All Read</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Total Notifications</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{notifications.length}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <Bell className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Unread</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{unreadCount}</p>
                </div>
                <div className="bg-[#EB5757] p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">High Priority</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{highPriorityCount}</p>
                </div>
                <div className="bg-red-500 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Today</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">
                    {notifications.filter(n => new Date(n.timestamp).toDateString() === new Date().toDateString()).length}
                  </p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EB5757] focus:border-transparent font-poppins text-sm bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { key: "All Types", label: "All" },
                  { key: "Order", label: "Orders" },
                  { key: "System", label: "System" },
                  { key: "Alert", label: "Alerts" },
                  { key: "User", label: "Users" },
                  { key: "Staff", label: "Staff" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleFilterChange("type", tab.key)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm font-poppins transition-colors ${
                      filters.type === tab.key
                        ? "border-[#EB5757] text-[#EB5757]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                    {tab.key !== "All Types" && (
                      <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                        {notifications.filter(n => 
                          tab.key === "All Types" || n.type.toLowerCase() === tab.key.toLowerCase()
                        ).length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Status and Priority Pills */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 font-poppins">Status:</span>
                <div className="flex space-x-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleFilterChange("status", status)}
                      className={`px-3 py-1 rounded-full text-sm font-poppins transition-colors ${
                        filters.status === status
                          ? "bg-[#EB5757] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status === "All Status" ? "All" : status}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 font-poppins">Priority:</span>
                <div className="flex space-x-2">
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      onClick={() => handleFilterChange("priority", priority)}
                      className={`px-3 py-1 rounded-full text-sm font-poppins transition-colors ${
                        filters.priority === priority
                          ? "bg-[#EB5757] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {priority === "All Priorities" ? "All" : priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#333333] font-poppins">
                  Notifications ({filteredNotifications.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-[#EB5757] hover:text-red-600 font-poppins flex items-center space-x-1"
                  >
                    <CheckCircle size={14} />
                    <span>Mark all read</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 font-poppins mb-2">No notifications found</h3>
                  <p className="text-gray-500 font-poppins">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start p-4 transition-colors cursor-pointer hover:bg-gray-50 ${
                        notification.status === "unread" 
                          ? "bg-blue-50/50" 
                          : "bg-white"
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className={`flex-shrink-0 p-2 rounded-full ${notification.bgColor} mr-4`}>
                        <span className={notification.color}>
                          {notification.icon}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-[#333333] font-poppins">{notification.title}</h4>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-poppins ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </span>
                              {notification.status === "unread" && (
                                <span className="w-2 h-2 bg-[#EB5757] rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 font-poppins mb-2">{notification.message}</p>
                            <div className="flex items-center text-xs text-gray-500 font-poppins">
                              <Clock size={12} className="mr-1" />
                              <span>{formatTimeAgo(notification.timestamp)}</span>
                              <span className="mx-2">•</span>
                              <span className="capitalize">{notification.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {notification.status === "unread" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMarkAsRead(notification.id)
                                }}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Mark as read"
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteNotification(notification.id)
                              }}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete notification"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-medium text-[#333333] font-poppins">Recent Orders</h3>
              </div>
              <p className="text-sm text-gray-600 font-poppins mb-4">
                Check and manage recent order notifications
              </p>
              <button 
                onClick={() => router.push('/admin/orders/list')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-poppins text-sm"
              >
                View Orders
              </button>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 p-2 rounded-full mr-3">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-medium text-[#333333] font-poppins">System Alerts</h3>
              </div>
              <p className="text-sm text-gray-600 font-poppins mb-4">
                Review critical system alerts and warnings
              </p>
              <button 
                onClick={() => router.push('/admin/settings')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins text-sm"
              >
                System Settings
              </button>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 p-2 rounded-full mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-medium text-[#333333] font-poppins">Performance</h3>
              </div>
              <p className="text-sm text-gray-600 font-poppins mb-4">
                View performance notifications and reports
              </p>
              <button 
                onClick={() => router.push('/admin/reports')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-poppins text-sm"
              >
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
