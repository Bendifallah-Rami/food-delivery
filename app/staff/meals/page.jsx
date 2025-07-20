"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, CheckCircle, ChefHat, Package, User, Timer, AlertTriangle } from "lucide-react"

export default function MealManagement() {
  const [orders, setOrders] = useState([])
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Mock orders data
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD12345",
        customerName: "John Doe",
        items: [
          { name: "Classic Burger", quantity: 2 },
          { name: "French Fries", quantity: 1 },
          { name: "Coca Cola", quantity: 2 }
        ],
        status: "Confirmed",
        orderTime: "14:30",
        estimatedTime: "15 mins",
        priority: "Normal",
        totalAmount: "$28.97"
      },
      {
        id: "ORD12346",
        customerName: "Sarah Wilson",
        items: [
          { name: "Margherita Pizza", quantity: 1 },
          { name: "Caesar Salad", quantity: 1 }
        ],
        status: "Preparing",
        orderTime: "14:35",
        estimatedTime: "12 mins",
        priority: "High",
        startedAt: "14:37",
        totalAmount: "$26.48"
      },
      {
        id: "ORD12347",
        customerName: "Mike Johnson",
        items: [
          { name: "Chicken Wings", quantity: 1 },
          { name: "Buffalo Sauce", quantity: 1 }
        ],
        status: "Ready",
        orderTime: "14:20",
        estimatedTime: "Complete",
        priority: "Normal",
        startedAt: "14:22",
        readyAt: "14:35",
        totalAmount: "$18.99"
      }
    ]
    setOrders(mockOrders)
  }, [])

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

  const startCooking = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Preparing", startedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    showToast(`Started cooking order ${orderId}`, "success")
  }

  const markReady = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Ready", readyAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    showToast(`Order ${orderId} is ready for pickup`, "success")
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle className="w-5 h-5 text-[#EB5757]" />
      case "Preparing":
        return <ChefHat className="w-5 h-5 text-orange-500" />
      case "Ready":
        return <Package className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-[#EB5757]/10 border-[#EB5757]/20"
      case "Preparing":
        return "bg-orange-50 border-orange-200"
      case "Ready":
        return "bg-green-50 border-green-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    return priority === "High" 
      ? "bg-red-100 text-red-800 border border-red-200"
      : "bg-gray-100 text-gray-600 border border-gray-200"
  }

  const stats = {
    confirmed: orders.filter(o => o.status === "Confirmed").length,
    preparing: orders.filter(o => o.status === "Preparing").length,
    ready: orders.filter(o => o.status === "Ready").length,
    total: orders.length
  }

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
              <span>Meal Management</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#333333] font-poppins">Kitchen Orders</h1>
                <p className="text-gray-600 font-poppins mt-2">Manage order preparation and cooking status</p>
              </div>
              <div className="flex space-x-3">
                <a
                  href="/staff/delivery"
                  className="px-4 py-2 bg-[#EB5757] text-white rounded-lg font-poppins hover:bg-red-600 transition-colors"
                >
                  Delivery Management
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <Package className="h-5 w-5 text-[#EB5757]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#333333] font-poppins">{stats.total}</h3>
                  <p className="text-sm text-gray-600 font-poppins mt-1">Total Orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-[#EB5757]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#333333] font-poppins">{stats.confirmed}</h3>
                  <p className="text-sm text-gray-600 font-poppins mt-1">Confirmed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl shadow-sm p-6 border border-orange-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <ChefHat className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#333333] font-poppins">{stats.preparing}</h3>
                  <p className="text-sm text-gray-600 font-poppins mt-1">Preparing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl shadow-sm p-6 border border-green-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <Package className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#333333] font-poppins">{stats.ready}</h3>
                  <p className="text-sm text-gray-600 font-poppins mt-1">Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className={`bg-white rounded-xl shadow-sm border-2 ${getStatusColor(order.status)} hover:shadow-md transition-all duration-200`}>
              <div className="p-6">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-bold text-[#333333] font-poppins text-lg">{order.id}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-600 font-poppins">{order.customerName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                    <p className="text-lg font-bold text-[#333333] font-poppins mt-2">{order.totalAmount}</p>
                  </div>
                </div>

                {/* Time Info */}
                <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <span className="font-poppins text-gray-600">Order Time:</span>
                      <span className="font-poppins font-medium text-[#333333]">{order.orderTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-poppins text-gray-600">ETA:</span>
                      <span className="font-poppins font-medium text-[#333333]">{order.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h4 className="font-medium text-[#333333] font-poppins mb-3">Order Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="font-poppins text-[#333333]">{item.name}</span>
                        <span className="font-poppins font-medium text-gray-600">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <div className={`flex flex-col items-center space-y-1 ${order.status === "Confirmed" || order.status === "Preparing" || order.status === "Ready" ? "text-[#EB5757]" : "text-gray-400"}`}>
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-poppins">Confirmed</span>
                      <span className="font-poppins">{order.orderTime}</span>
                    </div>
                    
                    <div className={`flex-1 h-0.5 mx-2 ${order.startedAt ? "bg-orange-500" : "bg-gray-200"}`}></div>
                    
                    <div className={`flex flex-col items-center space-y-1 ${order.status === "Preparing" || order.status === "Ready" ? "text-orange-500" : "text-gray-400"}`}>
                      <ChefHat className="w-4 h-4" />
                      <span className="font-poppins">Preparing</span>
                      {order.startedAt && <span className="font-poppins">{order.startedAt}</span>}
                    </div>

                    <div className={`flex-1 h-0.5 mx-2 ${order.readyAt ? "bg-green-500" : "bg-gray-200"}`}></div>

                    <div className={`flex flex-col items-center space-y-1 ${order.status === "Ready" ? "text-green-500" : "text-gray-400"}`}>
                      <Package className="w-4 h-4" />
                      <span className="font-poppins">Ready</span>
                      {order.readyAt && <span className="font-poppins">{order.readyAt}</span>}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {order.status === "Confirmed" && (
                    <button
                      onClick={() => startCooking(order.id)}
                      className="w-full bg-[#EB5757] text-white py-3 px-4 rounded-lg font-medium font-poppins hover:bg-red-600 transition-colors shadow-sm"
                    >
                      🔥 Start Cooking
                    </button>
                  )}

                  {order.status === "Preparing" && (
                    <button
                      onClick={() => markReady(order.id)}
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium font-poppins hover:bg-green-600 transition-colors shadow-sm"
                    >
                      ✅ Mark Ready
                    </button>
                  )}

                  {order.status === "Ready" && (
                    <div className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-lg font-medium font-poppins text-center border border-green-200">
                      🎉 Ready for Pickup
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 font-poppins mb-2">No Orders Yet</h3>
            <p className="text-gray-500 font-poppins">Orders will appear here when customers place them.</p>
          </div>
        )}
      </div>
    </div>
  )
}
