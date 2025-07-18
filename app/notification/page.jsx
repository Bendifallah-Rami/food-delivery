"use client"

import { Bell, Check, Clock, X, ArrowRight } from "lucide-react"
import Navbar from "../components/navbarnew"

export default function NotificationPage() {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Order Confirmed",
      message: "Your order #12345 has been confirmed and is being prepared",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "delivery",
      title: "Out for Delivery",
      message: "Your delicious food is on the way! Estimated delivery in 15 minutes",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 3,
      type: "promotion",
      title: "Special Offer",
      message: "Get 20% off on your next order. Use code FAST20",
      time: "1 hour ago",
      read: true
    },
    {
      id: 4,
      type: "order",
      title: "Order Delivered",
      message: "Your order has been successfully delivered. Enjoy your meal!",
      time: "2 hours ago",
      read: true
    },
    {
      id: 5,
      type: "system",
      title: "Profile Updated",
      message: "Your delivery address has been updated successfully",
      time: "1 day ago",
      read: true
    }
  ]

  return (
    <section className="min-h-screen bg-white font-poppins">
     <Navbar currentPage="notification" />
      <div className=" mx-auto px-4 sm:px-6 lg:px-28 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center bg-[#FEE9DE] text-[#EB5757] px-5 py-3 rounded-full text-sm font-medium mb-5">
            <span>Stay Updated</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-[#333333] leading-tight mb-4">
            Your <span className="text-[#EB5757]">Notifications</span>
          </h1>
          
          <p className="text-lg text-[#333333] font-medium max-w-md">
            Stay informed about your orders, deliveries, and special offers
          </p>
        </div>

        {/* Notification Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button className="bg-[#EB5757] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Mark All as Read
            </button>
            <button className="text-[#333333] hover:text-[#EB5757] font-medium transition-colors">
              Clear All
            </button>
          </div>
          
          <div className="flex items-center text-[#333333]">
            <Bell className="w-5 h-5 mr-2" />
            <span className="font-medium">{notifications.filter(n => !n.read).length} unread</span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {/* Today's Notifications */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-semibold text-[#333333]">Today</h3>
              <div className="h-[1px] bg-gray-200 flex-grow ml-4"></div>
            </div>
            
            {notifications
              .filter(n => n.time.includes('minute') || n.time.includes('hour'))
              .map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-6 rounded-2xl border-2 transition-all mb-4 ${
                    notification.read 
                      ? 'bg-white border-gray-100' 
                      : 'bg-[#FEE9DE] border-[#EB5757] border-opacity-20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          notification.read ? 'bg-gray-300' : 'bg-[#EB5757]'
                        }`}></div>
                        <h3 className="font-bold text-[#333333] text-lg">
                          {notification.title}
                        </h3>
                      </div>
                      
                      <p className="text-[#333333] font-medium mb-3 ml-6">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center text-gray-600 ml-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{notification.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-4">
                      <button className="p-2 hover:bg-white rounded-full transition-colors">
                        {notification.read ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#EB5757]"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          {/* Older Notifications */}
          <div>
            <div className="flex items-center mb-3">
              <h3 className="font-semibold text-[#333333]">Older</h3>
              <div className="h-[1px] bg-gray-200 flex-grow ml-4"></div>
            </div>
            
            {notifications
              .filter(n => n.time.includes('day'))
              .map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-6 rounded-2xl border-2 transition-all mb-4 ${
                    'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <h3 className="font-bold text-[#333333] text-lg">
                          {notification.title}
                        </h3>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">old</span>
                      </div>
                      
                      <p className="text-[#333333] font-medium mb-3 ml-6">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center text-gray-600 ml-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{notification.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-4">
                      <button className="p-2 hover:bg-white rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Empty State (when no notifications) */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#333333] mb-4">
              No Notifications Yet
            </h3>
            <p className="text-[#333333] font-medium mb-8 max-w-md mx-auto">
              When you place orders or receive updates, they'll appear here
            </p>
            <button className="bg-[#EB5757] hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              Order Now
            </button>
          </div>
        )}

        {/* Load More */}
        {notifications.length > 0 && (
          <div className="text-center mt-12">
            <button className="text-[#EB5757] hover:text-red-600 font-semibold px-6 py-3 rounded-full border-2 border-[#EB5757] hover:bg-[#EB5757]  transition-all">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
