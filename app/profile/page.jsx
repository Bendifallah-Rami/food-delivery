"use client"

import { useState } from "react"
import { Camera, Edit, MapPin, Phone, Mail, Calendar, Award, Heart, Clock, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
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
    console.log("Saving profile data:", profileData)
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden font-poppins">
      <Navbar currentPage="profile" />

      {/* Hero-style Header Section */}
      <section className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[500px] py-12 lg:py-5">
            {/* Left Content */}
            <div className="flex-1 lg:pr-12 z-10">
              {/* Badge */}
              <div className="inline-flex items-center bg-[#FEE9DE] text-[#EB5757] px-5 py-3 rounded-full text-sm font-medium mb-5">
                <span>Profile Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-[#333333] leading-tight mb-6">
                Welcome Back
                <br />
                <span className="text-[#EB5757]">{profileData.firstName}</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-[#333333] font-medium mb-8 max-w-md">
                Manage your profile, track your orders, and enjoy delicious food with fast delivery
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="bg-[#EB5757] hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              {/* Stats Preview */}
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#EB5757] to-red-600 rounded-full border-2 border-white flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{orderStats.totalOrders} Orders Completed</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">Member since {orderStats.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="relative">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FEE9DE] to-[#EB5757]/20 rounded-full"></div>
                <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={profileData.profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-64 h-64 rounded-full object-cover"
                    />
                    <button className="absolute bottom-4 right-4 bg-[#EB5757] text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg">
                      <Camera className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-[#EB5757] rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-[#333333]">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-3">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                    />
                  ) : (
                    <p className="text-[#333333] font-medium bg-gray-50 px-4 py-3 rounded-xl">{profileData.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-3">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                    />
                  ) : (
                    <p className="text-[#333333] font-medium bg-gray-50 px-4 py-3 rounded-xl">{profileData.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-3">Email</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#FEE9DE] rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#EB5757]" />
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                      />
                    ) : (
                      <p className="text-[#333333] font-medium bg-gray-50 px-4 py-3 rounded-xl flex-1">{profileData.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-3">Phone</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#FEE9DE] rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#EB5757]" />
                    </div>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                      />
                    ) : (
                      <p className="text-[#333333] font-medium bg-gray-50 px-4 py-3 rounded-xl flex-1">{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#333333] mb-3">Address</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#FEE9DE] rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#EB5757]" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                      />
                    ) : (
                      <p className="text-[#333333] font-medium bg-gray-50 px-4 py-3 rounded-xl flex-1">{profileData.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-3">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#EB5757] focus:border-[#EB5757] transition-colors"
                    />
                  ) : (
                    <p className="text-[#333333] font-medium bg-gray-50 px-4 py-3 rounded-xl">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-8 bg-[#EB5757] rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-[#333333]">Recent Orders</h2>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-[#FEE9DE]/30 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#EB5757] rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#333333]">{order.items}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#333333] text-lg">${order.total}</p>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
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
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-[#EB5757] rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-[#333333]">Statistics</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#333333] font-medium">Total Orders</span>
                  </div>
                  <span className="font-bold text-[#333333] text-xl">{orderStats.totalOrders}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#333333] font-medium">Favorite Items</span>
                  </div>
                  <span className="font-bold text-[#333333] text-xl">{orderStats.favoriteItems}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FEE9DE] to-[#EB5757]/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#333333] font-medium">Total Spent</span>
                  </div>
                  <span className="font-bold text-[#333333] text-xl">${orderStats.totalSpent}</span>
                </div>
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-gradient-to-br from-[#EB5757] to-red-600 rounded-3xl shadow-xl p-6 text-white">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-white rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold">Loyalty Program</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Current Points</span>
                  <span className="font-bold text-2xl">1,247</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full transition-all duration-300" style={{ width: "65%" }}></div>
                </div>
                <p className="text-sm opacity-90 font-medium">353 points until next reward!</p>
                <button className="w-full bg-white text-[#EB5757] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  View Rewards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}