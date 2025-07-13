"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, Search, Filter } from "lucide-react"

// Sample data structure - replace with your backend data
const menuData = {
  categories: [
    {
      id: 1,
      name: "Burger",
      icon: "🍔",
      count: 8,
      items: [
        { id: 1, name: "Classic Burger", price: 8.99, image: "/Frame 14.png", popular: true },
        { id: 2, name: "Cheese Burger", price: 9.99, image: "/Frame 14.png", popular: false },
        { id: 13, name: "BBQ Burger", price: 10.99, image: "/Frame 14.png", popular: true },
        { id: 14, name: "Chicken Burger", price: 9.49, image: "/Frame 14.png", popular: false },
        { id: 15, name: "Veggie Burger", price: 8.49, image: "/Frame 14.png", popular: false },
        { id: 16, name: "Double Burger", price: 12.99, image: "/Frame 14.png", popular: true },
        { id: 17, name: "Bacon Burger", price: 11.49, image: "/Frame 14.png", popular: false },
        { id: 18, name: "Spicy Burger", price: 9.99, image: "/Frame 14.png", popular: true },
      ],
    },
    {
      id: 2,
      name: "Pizza",
      icon: "🍕",
      count: 12,
      items: [
        { id: 3, name: "Italian Pizza", price: 7.49, image: "/Frame 14.png", popular: false },
        { id: 4, name: "Sausage Pizza", price: 6.59, image: "/Frame 14.png", popular: true },
        { id: 5, name: "Margherita Pizza", price: 8.99, image: "/Frame 14.png", popular: true },
        { id: 6, name: "Pepperoni Pizza", price: 9.49, image: "/Frame 14.png", popular: true },
        { id: 19, name: "Hawaiian Pizza", price: 10.99, image: "/Frame 14.png", popular: false },
        { id: 20, name: "Meat Lovers Pizza", price: 12.99, image: "/Frame 14.png", popular: true },
        { id: 21, name: "Veggie Pizza", price: 9.99, image: "/Frame 14.png", popular: false },
        { id: 22, name: "BBQ Chicken Pizza", price: 11.49, image: "/Frame 14.png", popular: true },
        { id: 23, name: "Buffalo Pizza", price: 10.49, image: "/Frame 14.png", popular: false },
        { id: 24, name: "Supreme Pizza", price: 13.99, image: "/Frame 14.png", popular: true },
        { id: 25, name: "White Pizza", price: 9.99, image: "/Frame 14.png", popular: false },
        { id: 26, name: "Seafood Pizza", price: 14.99, image: "/Frame 14.png", popular: false },
      ],
    },
    {
      id: 3,
      name: "Cupcake",
      icon: "🧁",
      count: 6,
      items: [
        { id: 7, name: "Chocolate Cupcake", price: 3.99, image: "/Frame 14.png", popular: true },
        { id: 8, name: "Vanilla Cupcake", price: 3.49, image: "/Frame 14.png", popular: false },
        { id: 27, name: "Red Velvet Cupcake", price: 4.49, image: "/Frame 14.png", popular: true },
        { id: 28, name: "Lemon Cupcake", price: 3.99, image: "/Frame 14.png", popular: false },
        { id: 29, name: "Strawberry Cupcake", price: 4.29, image: "/Frame 14.png", popular: true },
        { id: 30, name: "Carrot Cupcake", price: 4.19, image: "/Frame 14.png", popular: false },
      ],
    },
    {
      id: 4,
      name: "Ramen",
      icon: "🍜",
      count: 5,
      items: [
        { id: 9, name: "Chicken Ramen", price: 12.99, image: "/Frame 14.png", popular: true },
        { id: 10, name: "Beef Ramen", price: 14.99, image: "/Frame 14.png", popular: true },
        { id: 31, name: "Pork Ramen", price: 13.99, image: "/Frame 14.png", popular: false },
        { id: 32, name: "Seafood Ramen", price: 15.99, image: "/Frame 14.png", popular: true },
        { id: 33, name: "Vegetarian Ramen", price: 11.99, image: "/Frame 14.png", popular: false },
      ],
    },
    {
      id: 5,
      name: "Ice Cream",
      icon: "🍦",
      count: 4,
      items: [
        { id: 11, name: "Vanilla Ice Cream", price: 4.99, image: "/Frame 14.png", popular: false },
        { id: 12, name: "Chocolate Ice Cream", price: 5.49, image: "/Frame 14.png", popular: true },
        { id: 34, name: "Strawberry Ice Cream", price: 5.29, image: "/Frame 14.png", popular: true },
        { id: 35, name: "Mint Chocolate Chip", price: 5.99, image: "/Frame 14.png", popular: false },
      ],
    },
  ],
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(2) // Default to Pizza
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const itemsPerPage = 2

  // Get current category items with filtering
  const currentCategoryItems = menuData.categories.find((cat) => cat.id === activeCategory)?.items || []
  
  // Apply search and popular filters
  const filteredItems = currentCategoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPopular = !showPopularOnly || item.popular
    return matchesSearch && matchesPopular
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const displayedItems = filteredItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setCurrentPage(0)
    setSearchTerm("")
    setShowPopularOnly(false)
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(0)
    setIsSearching(e.target.value.length > 0)
  }

  const togglePopularFilter = () => {
    setShowPopularOnly(!showPopularOnly)
    setCurrentPage(0)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setShowPopularOnly(false)
    setCurrentPage(0)
  }

  return (
    <section className="relative py-16 lg:py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="inline-block bg-[#EB5757]/10 text-[#EB5757] px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Our Menu
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#333333] leading-tight max-w">
              Menu That Always <br />Makes You Fall In Love
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden lg:flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={totalPages <= 1}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={totalPages <= 1}
              className="w-12 h-12 bg-[#EB5757] rounded-full shadow-md flex items-center justify-center hover:bg-[#EB5757]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={togglePopularFilter}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    showPopularOnly
                      ? "bg-[#EB5757] text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-3 h-3" />
                  <span>Popular</span>
                </button>
                {(isSearching || showPopularOnly) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category List */}
              <div className="space-y-3">
                {menuData.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-left transition-all duration-200 ${
                      activeCategory === category.id
                        ? "bg-[#EB5757] text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-medium ${
                        activeCategory === category.id ? "text-red-100" : "text-gray-500"
                      }`}>
                        {category.count} items
                      </span>
                      {activeCategory === category.id && (
                        <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Results Summary */}
              {(isSearching || showPopularOnly) && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">
                    Showing {filteredItems.length} of {currentCategoryItems.length} items
                    {isSearching && ` for "${searchTerm}"`}
                    {showPopularOnly && " (Popular only)"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="lg:col-span-3">
            {displayedItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.popular && (
                          <div className="absolute top-4 left-4 bg-[#EB5757] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Popular
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">${item.price}</span>
                            <button
                              onClick={() => handleOrderNow(item)}
                              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-105"
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

                {/* Pagination Info */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                      <span className="text-sm text-gray-600">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentPage ? "bg-[#EB5757]" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#EB5757] text-white px-6 py-3 rounded-full hover:bg-[#EB5757]/80 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="lg:hidden flex justify-center space-x-2 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={totalPages <= 1}
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={totalPages <= 1}
                className="w-12 h-12 bg-[#EB5757] rounded-full shadow-md flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-8 w-4 h-4 bg-yellow-400 rounded-full"></div>
      <div className="absolute bottom-20 left-8 w-3 h-3 bg-[#EB5757] rounded-full"></div>
    </section>
  )
}