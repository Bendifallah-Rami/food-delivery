"use client"

import { useState, useEffect, useCallback } from "react"
import { Package, Truck, CheckCircle, MapPin, Phone, Clock, User, Timer, AlertTriangle } from "lucide-react"

export default function DeliveryManagement() {
  const [orders, setOrders] = useState([])
  const [deliveryPersons, setDeliveryPersons] = useState([])
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Mock data
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD12347",
        customerName: "Mike Johnson",
        customerPhone: "+1234567890",
        customerAddress: "123 Main St, New York, NY 10001",
        items: [
          { name: "Chicken Wings", quantity: 1 },
          { name: "Buffalo Sauce", quantity: 1 }
        ],
        status: "Ready",
        orderTime: "14:20",
        readyAt: "14:35",
        totalAmount: "$18.99",
        priority: "Normal"
      },
      {
        id: "ORD12348",
        customerName: "Emma Davis",
        customerPhone: "+1234567891",
        customerAddress: "456 Oak Ave, Brooklyn, NY 11201",
        items: [
          { name: "Margherita Pizza", quantity: 1 },
          { name: "Garlic Bread", quantity: 1 }
        ],
        status: "Assigned",
        orderTime: "14:25",
        readyAt: "14:40",
        totalAmount: "$24.50",
        priority: "High",
        assignedTo: "John Smith"
      },
      {
        id: "ORD12349",
        customerName: "Robert Brown",
        customerPhone: "+1234567892",
        customerAddress: "789 Pine St, Manhattan, NY 10002",
        items: [
          { name: "Classic Burger", quantity: 2 },
          { name: "French Fries", quantity: 1 }
        ],
        status: "Picked Up",
        orderTime: "14:15",
        readyAt: "14:30",
        pickedUpAt: "14:45",
        totalAmount: "$31.98",
        priority: "Normal",
        assignedTo: "Sarah Wilson"
      }
    ]

    const mockDeliveryPersons = [
      { id: 1, name: "John Smith", status: "Available" },
      { id: 2, name: "Sarah Wilson", status: "On Delivery" },
      { id: 3, name: "Mike Rodriguez", status: "Available" },
      { id: 4, name: "UberEats Driver", status: "External" },
      { id: 5, name: "DoorDash Driver", status: "External" },
      { id: 6, name: "Grubhub Driver", status: "External" }
    ]

    setOrders(mockOrders)
    setDeliveryPersons(mockDeliveryPersons)
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

  const assignDelivery = (orderId, deliveryPerson) => {
    if (!deliveryPerson) {
      showToast("Please select a delivery person", "error")
      return
    }

    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Assigned", assignedTo: deliveryPerson }
        : order
    ))
    showToast(`Order ${orderId} assigned to ${deliveryPerson}`, "success")
  }

  const markPickedUp = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Picked Up", pickedUpAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    showToast(`Order ${orderId} marked as picked up`, "success")
  }

  const markDelivered = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Delivered", deliveredAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    showToast(`Order ${orderId} delivered successfully`, "success")
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ready":
        return <Package className="w-5 h-5 text-green-500" />
      case "Assigned":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "Picked Up":
        return <MapPin className="w-5 h-5 text-orange-500" />
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "bg-green-50 border-green-200"
      case "Assigned":
        return "bg-blue-50 border-blue-200"
      case "Picked Up":
        return "bg-orange-50 border-orange-200"
      case "Delivered":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getPriorityBadge = (priority) => {
    return priority === "High" 
      ? "bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium border border-red-200"
      : "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200"
  }

  const stats = {
    ready: orders.filter(o => o.status === "Ready").length,
    assigned: orders.filter(o => o.status === "Assigned").length,
    pickedUp: orders.filter(o => o.status === "Picked Up").length,
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
              <span>Delivery Management</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#333333] font-poppins">Delivery Orders</h1>
                <p className="text-gray-600 font-poppins mt-2">Assign deliveries and track pickup/delivery status</p>
              </div>
              <div className="flex space-x-3">
                <a
                  href="/staff/meals"
                  className="px-4 py-2 bg-[#EB5757] text-white rounded-lg font-poppins hover:bg-red-600 transition-colors"
                >
                  Meal Management
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

          <div className="bg-blue-50 rounded-xl shadow-sm p-6 border border-blue-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <Truck className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#333333] font-poppins">{stats.assigned}</h3>
                  <p className="text-sm text-gray-600 font-poppins mt-1">Assigned</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl shadow-sm p-6 border border-orange-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <MapPin className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#333333] font-poppins">{stats.pickedUp}</h3>
                  <p className="text-sm text-gray-600 font-poppins mt-1">In Transit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <span className={getPriorityBadge(order.priority)}>
                      {order.priority}
                    </span>
                    <p className="text-lg font-bold text-[#333333] font-poppins mt-2">{order.totalAmount}</p>
                  </div>
                </div>

                {/* Customer Contact Info */}
                <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-[#333333] font-poppins mb-3">Customer Details:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="font-poppins text-[#333333]">{order.customerPhone}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="font-poppins text-[#333333] text-sm leading-relaxed">{order.customerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Time Info */}
                <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-blue-600" />
                      <span className="font-poppins text-blue-700">Order Time:</span>
                      <span className="font-poppins font-medium text-blue-800">{order.orderTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-poppins text-blue-700">Ready At:</span>
                      <span className="font-poppins font-medium text-blue-800">{order.readyAt}</span>
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

                {/* Assigned Driver Info */}
                {order.assignedTo && (
                  <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="font-poppins text-blue-700">Assigned to:</span>
                      <span className="font-poppins font-medium text-blue-800">{order.assignedTo}</span>
                    </div>
                  </div>
                )}

                {/* Progress Timeline */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <div className={`flex flex-col items-center space-y-1 text-green-500`}>
                      <Package className="w-4 h-4" />
                      <span className="font-poppins">Ready</span>
                      <span className="font-poppins">{order.readyAt}</span>
                    </div>
                    
                    <div className={`flex-1 h-0.5 mx-2 ${order.assignedTo ? "bg-blue-500" : "bg-gray-200"}`}></div>
                    
                    <div className={`flex flex-col items-center space-y-1 ${order.status === "Assigned" || order.status === "Picked Up" || order.status === "Delivered" ? "text-blue-500" : "text-gray-400"}`}>
                      <Truck className="w-4 h-4" />
                      <span className="font-poppins">Assigned</span>
                      {order.assignedTo && <span className="font-poppins">✓</span>}
                    </div>

                    <div className={`flex-1 h-0.5 mx-2 ${order.pickedUpAt ? "bg-orange-500" : "bg-gray-200"}`}></div>

                    <div className={`flex flex-col items-center space-y-1 ${order.status === "Picked Up" || order.status === "Delivered" ? "text-orange-500" : "text-gray-400"}`}>
                      <MapPin className="w-4 h-4" />
                      <span className="font-poppins">Picked Up</span>
                      {order.pickedUpAt && <span className="font-poppins">{order.pickedUpAt}</span>}
                    </div>

                    <div className={`flex-1 h-0.5 mx-2 ${order.deliveredAt ? "bg-green-600" : "bg-gray-200"}`}></div>

                    <div className={`flex flex-col items-center space-y-1 ${order.status === "Delivered" ? "text-green-600" : "text-gray-400"}`}>
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-poppins">Delivered</span>
                      {order.deliveredAt && <span className="font-poppins">{order.deliveredAt}</span>}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {order.status === "Ready" && (
                    <div className="space-y-3">
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg font-poppins bg-white"
                        onChange={(e) => assignDelivery(order.id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="">Select Delivery Person</option>
                        {deliveryPersons.map((person) => (
                          <option key={person.id} value={person.name}>
                            {person.name} {person.status !== "Available" && `(${person.status})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {order.status === "Assigned" && (
                    <button
                      onClick={() => markPickedUp(order.id)}
                      className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium font-poppins hover:bg-orange-600 transition-colors shadow-sm"
                    >
                      🚚 Mark as Picked Up
                    </button>
                  )}

                  {order.status === "Picked Up" && (
                    <button
                      onClick={() => markDelivered(order.id)}
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium font-poppins hover:bg-green-600 transition-colors shadow-sm"
                    >
                      ✅ Mark as Delivered
                    </button>
                  )}

                  {order.status === "Delivered" && (
                    <div className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-lg font-medium font-poppins text-center border border-green-200">
                      🎉 Delivered Successfully
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
            <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 font-poppins mb-2">No Delivery Orders</h3>
            <p className="text-gray-500 font-poppins">Ready orders will appear here for delivery assignment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
