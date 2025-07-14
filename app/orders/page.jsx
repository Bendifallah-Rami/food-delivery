"use client"

import { useState } from "react"
import { Clock, MapPin, Phone, Star, MessageCircle, Truck, ChefHat, CheckCircle } from "lucide-react"
import Navbar from "../components/navbarnew"

export default function MyOrdersPage() {
  const [activeOrders] = useState([
    {
      id: "FD-2024-001",
      status: "preparing",
      items: [
        { name: "Classic Burger", quantity: 2, price: 8.99 },
        { name: "French Fries", quantity: 1, price: 4.99 },
      ],
      total: 22.97,
      orderTime: "2024-01-15T14:30:00",
      estimatedDelivery: "2024-01-15T15:15:00",
      deliveryAddress: "123 Main St, New York, NY 10001",
      restaurant: "Fudo Kitchen",
      driver: {
        name: "Mike Johnson",
        phone: "+1 (555) 987-6543",
        rating: 4.8,
        vehicle: "Honda Civic - ABC 123",
      },
      timeline: [
        { status: "confirmed", time: "14:30", completed: true },
        { status: "preparing", time: "14:35", completed: true },
        { status: "ready", time: "15:05", completed: false },
        { status: "picked_up", time: "15:10", completed: false },
        { status: "delivered", time: "15:15", completed: false },
      ],
    },
    {
      id: "FD-2024-002",
      status: "on_the_way",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 12.99 },
        { name: "Chocolate Cupcake", quantity: 2, price: 3.99 },
      ],
      total: 20.97,
      orderTime: "2024-01-15T13:45:00",
      estimatedDelivery: "2024-01-15T14:30:00",
      deliveryAddress: "456 Oak Ave, New York, NY 10002",
      restaurant: "Fudo Kitchen",
      driver: {
        name: "Sarah Wilson",
        phone: "+1 (555) 123-4567",
        rating: 4.9,
        vehicle: "Toyota Prius - XYZ 789",
      },
      timeline: [
        { status: "confirmed", time: "13:45", completed: true },
        { status: "preparing", time: "13:50", completed: true },
        { status: "ready", time: "14:15", completed: true },
        { status: "picked_up", time: "14:20", completed: true },
        { status: "delivered", time: "14:30", completed: false },
      ],
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-purple-100 text-purple-800"
      case "on_the_way":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "preparing":
        return <ChefHat className="w-4 h-4" />
      case "ready":
        return <Clock className="w-4 h-4" />
      case "on_the_way":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins ">
      <Navbar currentPage="orders" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#333333]">My Orders</h1>
          <div className="text-sm text-[#333333]">
            {activeOrders.length} active order{activeOrders.length !== 1 ? "s" : ""}
          </div>
        </div>

        {activeOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-[#333333] mb-2">No active orders</h2>
            <p className="text-[#333333] mb-8">You don't have any orders in progress right now.</p>
            <button className="bg-[#EB5757] text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors">
              Order Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-xl font-bold text-[#333333]">Order #{order.id}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status.replace("_", " ")}</span>
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Ordered at {formatTime(order.orderTime)} • Total: ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#333333]">Estimated delivery</p>
                      <p className="text-lg font-bold text-[#EB5757]">{formatTime(order.estimatedDelivery)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {/* Order Items */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-[#333333] mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-[#333333]">{item.name}</p>
                            <p className="text-sm text-[#333333]">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-[#333333]">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-[#333333] mb-4">Order Progress</h3>
                    <div className="space-y-4">
                      {order.timeline.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed ? "bg-[#EB5757] text-white" : "bg-gray-200 text-gray-400"
                            }`}
                          >
                            {step.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                              {step.status.charAt(0).toUpperCase() + step.status.slice(1).replace("_", " ")}
                            </p>
                            <p className="text-sm text-gray-500">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-gray-900 mb-4">Delivery Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-[#333333]">Delivery Address</p>
                          <p className="text-sm text-[#333333]">{order.deliveryAddress}</p>
                        </div>
                      </div>

                      {order.driver && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-[#333333]">Your Driver</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{order.driver.rating}</span>
                            </div>
                          </div>
                          <p className="text-[#333333] font-medium">{order.driver.name}</p>
                          <p className="text-sm text-gray-600">{order.driver.vehicle}</p>
                          <div className="flex space-x-2 mt-3">
                            <button className="flex-1 bg-[#EB5757] text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center justify-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>Call</span>
                            </button>
                            <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>Message</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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
