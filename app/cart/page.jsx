"use client"

import { useState } from "react"
import Image from "next/image" // Using next/image for optimized images
import { Minus, Plus, Trash2, ArrowRight, MapPin, Clock } from "lucide-react"
import Navbar from "../components/navbarnew" // Assuming Navbar is in ../components/navbarnew.jsx
import Link from "next/link"

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic Burger",
      price: 8.99,
      quantity: 2,
      image: "/Frame 14.png",
      description: "Juicy beef patty with lettuce, tomato, onion",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 12.99,
      quantity: 1,
      image: "/Frame 14.png",
      description: "Fresh mozzarella, tomato sauce, and basil",
    },
    {
      id: 3,
      name: "Chocolate Cupcake",
      price: 3.99,
      quantity: 3,
      image: "/Frame 14.png",
      description: "Rich chocolate cupcake with creamy chocolate frosting",
    },
  ])

  const [deliveryInfo] = useState({
    address: "123 Main St, New York, NY 10001",
    estimatedTime: "25-35 min",
    deliveryFee: 2.99,
  })

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + deliveryInfo.deliveryFee + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar cartCount={0} /> */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
          <Link href="/menu">
            <button className="bg-[#EB5757] text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors">
              Browse Menu
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80} // Explicit width for next/image
                      height={80} // Explicit height for next/image
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm truncate">{item.description}</p>
                      <p className="font-bold text-[#EB5757] mt-1 text-base">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-gray-900 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors text-red-600"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#EB5757] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Delivery Address</p>
                    <p className="text-gray-600 text-sm">{deliveryInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#EB5757] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Estimated Time</p>
                    <p className="text-gray-600 text-sm">{deliveryInfo.estimatedTime}</p>
                  </div>
                </div>
              </div>
              <Link href="/location-confirm">
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Change Address
                </button>
              </Link>
            </div>
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryInfo.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <hr className="my-3 border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#EB5757]">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/location-confirm">
                <button className="w-full mt-6 bg-[#EB5757] text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
