"use client"

import { useState } from "react"
import { MapPin, Edit, ArrowRight, ArrowLeft } from "lucide-react"
import Navbar from "../components/navbarnew"
import Link from "next/link"

export default function LocationConfirm() {
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    deliveryInstructions: "",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save to backend
    console.log("Saving user info:", userInfo)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={3} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/cart">
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Confirm Delivery Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Delivery Information</h2>
                <button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="flex items-center space-x-2 text-[#EB5757] hover:text-red-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>{isEditing ? "Save" : "Edit"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.email}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.zipCode}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Instructions (Optional)
                  </label>
                  {isEditing ? (
                    <textarea
                      value={userInfo.deliveryInstructions}
                      onChange={(e) => handleInputChange("deliveryInstructions", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="e.g., Leave at front door, Ring doorbell, etc."
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userInfo.deliveryInstructions || "No special instructions"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Delivery Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Address</h3>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#EB5757] mt-1" />
                <div>
                  <p className="font-medium text-gray-900">
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">{userInfo.address}</p>
                  <p className="text-gray-600 text-sm">
                    {userInfo.city}, {userInfo.state} {userInfo.zipCode}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">{userInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-[#EB5757] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Estimated Delivery</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold">25-35 min</p>
                <p className="text-red-100">Your order will arrive fresh and hot!</p>
              </div>
            </div>

            {/* Continue Button */}
            <Link href="/payment">
              <button className="w-full bg-[#EB5757] text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
