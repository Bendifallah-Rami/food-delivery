"use client"

import { useState } from "react"
import { Camera, Edit, MapPin, Phone, Mail, Calendar, Award, Heart, Clock } from "lucide-react"
import Navbar from "../components/navbarnew"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "1990-05-15",
    profileImage: "/placeholder.svg?height=150&width=150",
  })

  const [orderStats] = useState({
    totalOrders: 47,
    favoriteItems: 12,
    totalSpent: 1247.5,
    memberSince: "January 2023",
  })

  const [recentOrders] = useState([
    { id: 1, date: "2024-01-15", items: "Classic Burger, Fries", total: 15.99, status: "Delivered" },
    { id: 2, date: "2024-01-12", items: "Margherita Pizza", total: 12.99, status: "Delivered" },
    { id: 3, date: "2024-01-10", items: "Chicken Ramen, Ice Cream", total: 18.98, status: "Delivered" },
  ])

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Saving profile data:", profileData)
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="profile" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#EB5757] to-red-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
              <div className="relative">
                <img
                  src={profileData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-[#EB5757] text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-gray-600 mt-1">Food Enthusiast</p>
                <div className="flex items-center justify-center sm:justify-start space-x-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {orderStats.memberSince}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{orderStats.totalOrders} orders</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="bg-[#EB5757] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{order.items}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${order.total}</p>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Order Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Statistics</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-[#EB5757]" />
                    <span className="text-gray-600">Total Orders</span>
                  </div>
                  <span className="font-bold text-gray-900">{orderStats.totalOrders}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-[#EB5757]" />
                    <span className="text-gray-600">Favorite Items</span>
                  </div>
                  <span className="font-bold text-gray-900">{orderStats.favoriteItems}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-[#EB5757]" />
                    <span className="text-gray-600">Total Spent</span>
                  </div>
                  <span className="font-bold text-gray-900">${orderStats.totalSpent}</span>
                </div>
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-gradient-to-br from-[#EB5757] to-red-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Loyalty Program</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Points</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <p className="text-sm opacity-90">353 points until next reward!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
