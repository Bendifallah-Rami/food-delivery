"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

// Sample data structure - replace with your backend data
const menuData = {
  categories: [
    {
      id: 1,
      name: "Burger",
      icon: "🍔",
      items: [
        { id: 1, name: "Classic Burger", price: 8.99, image: "/placeholder.svg?height=300&width=300" },
        { id: 2, name: "Cheese Burger", price: 9.99, image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 2,
      name: "Pizza",
      icon: "🍕",
      items: [
        { id: 3, name: "Italian Pizza", price: 7.49, image: "/placeholder.svg?height=300&width=300" },
        { id: 4, name: "Sausage Pizza", price: 6.59, image: "/placeholder.svg?height=300&width=300" },
        { id: 5, name: "Margherita Pizza", price: 8.99, image: "/placeholder.svg?height=300&width=300" },
        { id: 6, name: "Pepperoni Pizza", price: 9.49, image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 3,
      name: "Cupcake",
      icon: "🧁",
      items: [
        { id: 7, name: "Chocolate Cupcake", price: 3.99, image: "/placeholder.svg?height=300&width=300" },
        { id: 8, name: "Vanilla Cupcake", price: 3.49, image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 4,
      name: "Ramen",
      icon: "🍜",
      items: [
        { id: 9, name: "Chicken Ramen", price: 12.99, image: "/placeholder.svg?height=300&width=300" },
        { id: 10, name: "Beef Ramen", price: 14.99, image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 5,
      name: "Ice Cream",
      icon: "🍦",
      items: [
        { id: 11, name: "Vanilla Ice Cream", price: 4.99, image: "/placeholder.svg?height=300&width=300" },
        { id: 12, name: "Chocolate Ice Cream", price: 5.49, image: "/placeholder.svg?height=300&width=300" },
      ],
    },
  ],
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(2) // Default to Pizza
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 2

  const currentItems = menuData.categories.find((cat) => cat.id === activeCategory)?.items || []
  const totalPages = Math.ceil(currentItems.length / itemsPerPage)
  const displayedItems = currentItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setCurrentPage(0)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  const handleOrderNow = (item) => {
    // Handle order functionality - integrate with your cart/order system
    console.log("Order item:", item)
  }

  return (
    <section className="relative bg-gray-50 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <div className="inline-block bg-red-50 text-red-500 px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Our Menu
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-md">
              Menu That Always Makes You Fall In Love
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden lg:flex space-x-2">
            <button
              onClick={handlePrevPage}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNextPage}
              className="w-12 h-12 bg-red-500 rounded-full shadow-md flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {menuData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-full text-left transition-all ${
                    activeCategory === category.id
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${item.price}</span>
                        <button
                          onClick={() => handleOrderNow(item)}
                          className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <span className="font-medium">Order Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex justify-center space-x-2 mt-8">
              <button
                onClick={handlePrevPage}
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNextPage}
                className="w-12 h-12 bg-red-500 rounded-full shadow-md flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-8 w-4 h-4 bg-yellow-400 rounded-full"></div>
      <div className="absolute bottom-20 left-8 w-3 h-3 bg-red-400 rounded-full"></div>
    </section>
  )
}
