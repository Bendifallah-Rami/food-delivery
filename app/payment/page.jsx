"use client"

import { useState } from "react"
import { CreditCard, DollarSign, ArrowRight, ArrowLeft, Check } from "lucide-react"
import Navbar from "../components/navbarnew"
import Link from "next/link"

export default function PaymentMethod() {
  const [selectedPayment, setSelectedPayment] = useState("cash")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const orderSummary = {
    subtotal: 30.97,
    deliveryFee: 2.99,
    tax: 2.48,
    total: 36.44,
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    // Here you would typically send the order to your backend
    console.log("Order placed with payment method:", selectedPayment)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar cartCount={0} />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll start preparing your delicious meal right away.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-2xl font-bold text-[#EB5757]">#FD-2024-001</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">25-35 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">Cash on Delivery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-[#EB5757]">${orderSummary.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/orders">
                <button className="w-full bg-[#EB5757] text-white py-3 rounded-lg hover:bg-red-600 transition-colors">
                  Track Your Order
                </button>
              </Link>
              <Link href="/menu">
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={3} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/location-confirm">
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Payment Method</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>

              <div className="space-y-4">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setSelectedPayment("cash")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPayment === "cash" ? "border-[#EB5757] bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === "cash" ? "border-[#EB5757] bg-[#EB5757]" : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === "cash" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                        <p className="text-gray-600 text-sm">Pay with cash when your order arrives</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card (Coming Soon) */}
                <div className="p-4 border-2 border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Credit/Debit Card</h3>
                        <p className="text-gray-600 text-sm">Coming Soon - Online payment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Payment Information</h4>
                <p className="text-yellow-700 text-sm">
                  Currently, we only accept cash on delivery. Please have the exact amount ready when your order
                  arrives. Online payment options will be available soon!
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${orderSummary.deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#EB5757]">${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!selectedPayment}
              className="w-full bg-[#EB5757] text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
