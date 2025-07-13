"use client"

import { useState } from "react"
import { Calendar, Search, Filter, Star, RotateCcw, Eye } from "lucide-react"
import Navbar from "../components/navbarnew"

export default function OrderHistoryPage() {
  const [orderHistory] = useState([
    {
      id: "FD-2024-001",
      date: "2024-01-15",
      time: "14:30",
      items: [
        { name: "Classic Burger", quantity: 2, price: 8.99 },
        { name: "French Fries", quantity: 1, price: 4.99 },
      ],
      total: 22.97,
      status: "delivered",
      rating: 5,
      restaurant: "Fudo Kitchen",
      deliveryTime: "35 min",
    },
    {
      id: "FD-2024-002",
      date: "2024-01-12",
      time: "19:15",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 12.99 },
        { name: "Chocolate Cupcake", quantity: 2, price: 3.99 },
      ],
      total: 20.97,
      status: "delivered",
      rating: 4,
      restaurant: "Fudo Kitchen",
      deliveryTime: "28 min",
    },
    {
      id: "FD-2024-003",
      date: "2024-01-10",
      time: "13:20",
      items: [
        { name: "Chicken Ramen", quantity: 1, price: 12.99 },
        { name: "Vanilla Ice Cream", quantity: 1, price: 4.99 },
      ],
      total: 17.98,
      status: "delivered",
      rating: 5,
      restaurant: "Fudo Kitchen",
      deliveryTime: "42 min",
    },
    {
      id: "FD-2024-004",
      date: "2024-01-08",
      time: "12:45",
      items: [
        { name: "BBQ Burger", quantity: 1, price: 10.99 },
        { name: "Onion Rings", quantity: 1, price: 5.99 },
      ],
      total: 16.98,
      status: "delivered",
      rating: 4,
      restaurant: "Fudo Kitchen",
      deliveryTime: "31 min",
    },
    {
      id: "FD-2024-005",
      date: "2024-01-05",
      time: "18:30",
      items: [
        { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
        { name: "Garlic Bread", quantity: 1, price: 6.99 },
      ],
      total: 21.98,
      status: "delivered",
      rating: 5,
      restaurant: "Fudo Kitchen",
      deliveryTime: "25 min",
    },
    {
      id: "FD-2024-006",
      date: "2024-01-03",
      time: "20:15",
      items: [{ name: "Beef Ramen", quantity: 1, price: 14.99 }],
      total: 14.99,
      status: "cancelled",
      rating: null,
      restaurant: "Fudo Kitchen",
      deliveryTime: null,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = orderHistory.filter((order) => {
    const matchesSearch = order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    let matchesDate = true
    if (dateRange !== "all") {
      const orderDate = new Date(order.date)
      const now = new Date()
      const daysDiff = (now - orderDate) / (1000 * 60 * 60 * 24)

      switch (dateRange) {
        case "week":
          matchesDate = daysDiff <= 7
          break
        case "month":
          matchesDate = daysDiff <= 30
          break
        case "3months":
          matchesDate = daysDiff <= 90
          break
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const totalSpent = orderHistory
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0)

  const totalOrders = orderHistory.filter((order) => order.status === "delivered").length
  const averageRating = orderHistory
    .filter((order) => order.rating)
    .reduce((sum, order, _, arr) => sum + order.rating / arr.length, 0)

  const reorderItems = (order) => {
    console.log("Reordering:", order)
    // Handle reorder logic
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order History</h1>
          <p className="text-xl text-gray-600">Track all your delicious food adventures</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#EB5757]">{totalOrders}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#EB5757]">${totalSpent.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#EB5757]">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#EB5757]">
              {totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0} min
            </div>
            <div className="text-sm text-gray-600">Avg Delivery</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by food name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none"
              >
                <option value="all">All Orders</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="3months">Last 3 Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">
                          {new Date(order.date).toLocaleDateString()} at {order.time}
                        </p>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-gray-900 text-sm">
                              {item.quantity}x {item.name}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-2xl font-bold text-[#EB5757]">${order.total.toFixed(2)}</p>
                        {order.deliveryTime && (
                          <p className="text-gray-600 text-sm">Delivered in {order.deliveryTime}</p>
                        )}
                        {order.rating && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{order.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>

                    {order.status === "delivered" && (
                      <button
                        onClick={() => reorderItems(order)}
                        className="px-4 py-2 bg-[#EB5757] text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reorder</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.id}</h2>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 text-2xl">
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Order Date</h4>
                    <p className="text-gray-600">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Order Time</h4>
                    <p className="text-gray-600">{selectedOrder.time}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Status</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Total</h4>
                    <p className="text-2xl font-bold text-[#EB5757]">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.rating && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Rating</h4>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= selectedOrder.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">{selectedOrder.rating}/5</span>
                    </div>
                  </div>
                )}

                {selectedOrder.status === "delivered" && (
                  <button
                    onClick={() => {
                      reorderItems(selectedOrder)
                      setSelectedOrder(null)
                    }}
                    className="w-full bg-[#EB5757] text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reorder These Items</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
