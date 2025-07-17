"use client"

import { useState } from "react"
import { Clock, MapPin, Phone, Star, MessageCircle, Truck, ChefHat, CheckCircle, ArrowRight } from "lucide-react"
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
        return "bg-[#FEE9DE] text-[#EB5757]"
      case "preparing":
        return "bg-[#FEE9DE] text-[#EB5757]"
      case "ready":
        return "bg-[#FEE9DE] text-[#EB5757]"
      case "on_the_way":
        return "bg-[#FEE9DE] text-[#EB5757]"
      case "delivered":
        return "bg-[#FEE9DE] text-[#EB5757]"
      default:
        return "bg-[#FEE9DE] text-[#EB5757]"
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
    <div className="min-h-screen bg-white font-poppins">
      <Navbar currentPage="orders" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center bg-[#FEE9DE] text-[#EB5757] px-5 py-3 rounded-full text-sm font-medium mb-5">
            <span>Track Progress</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#333333] leading-tight mb-4">
                My <span className="text-[#EB5757]">Orders</span>
              </h1>
              <p className="text-lg text-[#333333] font-medium">
                Track your delicious food orders in real-time
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-[#EB5757]">
                {activeOrders.length}
              </div>
              <div className="text-sm text-[#333333] font-medium">
                Active Order{activeOrders.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {activeOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#FEE9DE] rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-12 h-12 text-[#EB5757]" />
            </div>
            <h2 className="text-3xl font-bold text-[#333333] mb-4">No active orders</h2>
            <p className="text-lg text-[#333333] font-medium mb-8 max-w-md mx-auto">
              You don't have any orders in progress right now
            </p>
            <button className="bg-[#EB5757] hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              Order Now
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border-2 border-[#FEE9DE] overflow-hidden">
                {/* Order Header */}
                <div className="p-6 bg-[#FEE9DE] border-b border-[#EB5757]/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-xl font-bold text-[#333333]">Order #{order.id}</h2>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-2 capitalize">{order.status.replace("_", " ")}</span>
                        </span>
                      </div>
                      <p className="text-[#333333] font-medium">
                        Ordered at {formatTime(order.orderTime)} • Total: ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#333333] font-medium">Estimated delivery</p>
                      <p className="text-2xl font-bold text-[#EB5757]">{formatTime(order.estimatedDelivery)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                  {/* Order Items */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-[#333333] mb-4 text-lg">Order Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-[#FEE9DE] rounded-lg">
                          <div>
                            <p className="font-semibold text-[#333333]">{item.name}</p>
                            <p className="text-sm text-[#333333] font-medium">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-[#EB5757]">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-[#333333] mb-4 text-lg">Order Progress</h3>
                    <div className="space-y-4">
                      {order.timeline.map((step, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              step.completed 
                                ? "bg-[#EB5757] border-[#EB5757] text-white" 
                                : "bg-white border-[#FEE9DE] text-[#EB5757]"
                            }`}
                          >
                            {step.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${step.completed ? "text-[#333333]" : "text-gray-400"}`}>
                              {step.status.charAt(0).toUpperCase() + step.status.slice(1).replace("_", " ")}
                            </p>
                            <p className="text-sm text-[#333333] font-medium">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="lg:col-span-1">
                    <h3 className="font-bold text-[#333333] mb-4 text-lg">Delivery Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-[#FEE9DE] rounded-lg">
                        <MapPin className="w-5 h-5 text-[#EB5757] mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#333333]">Delivery Address</p>
                          <p className="text-sm text-[#333333] font-medium">{order.deliveryAddress}</p>
                        </div>
                      </div>

                      {order.driver && (
                        <div className="bg-[#FEE9DE] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <p className="font-bold text-[#333333]">Your Driver</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-[#333333]">{order.driver.rating}</span>
                            </div>
                          </div>
                          <p className="text-[#333333] font-bold">{order.driver.name}</p>
                          <p className="text-sm text-[#333333] font-medium mb-3">{order.driver.vehicle}</p>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-[#EB5757] hover:bg-red-600 text-white py-2 px-3 rounded-full text-sm font-semibold transition-colors flex items-center justify-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>Call</span>
                            </button>
                            <button className="flex-1 bg-white hover:bg-gray-50 text-[#333333] py-2 px-3 rounded-full text-sm font-semibold border-2 border-[#EB5757] transition-colors flex items-center justify-center space-x-1">
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

        {/* View Order History Button */}
        {activeOrders.length > 0 && (
          <div className="text-center mt-12">
            <button className="text-[#EB5757] hover:text-white hover:bg-[#EB5757] font-semibold px-8 py-4 rounded-full border-2 border-[#EB5757] transition-all">
              View Order History
            </button>
          </div>
        )}
      </div>
    </div>
  )
}