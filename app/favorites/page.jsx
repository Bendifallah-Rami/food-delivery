"use client"

import { useState } from "react"
import { Heart, Plus, Star, Filter, Search } from "lucide-react"
import Navbar from "../components/navbarnew"

export default function FavoritesPage() {
  const [favorites] = useState([
    {
      id: 1,
      name: "Classic Burger",
      price: 8.99,
      image: "/Frame 14.png",
      description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
      rating: 4.5,
      reviews: 124,
      category: "Burger",
      addedDate: "2024-01-10",
      orderCount: 5,
    },
    {
      id: 3,
      name: "Margherita Pizza",
      price: 12.99,
      image: "/Frame 14.png",
      description: "Fresh mozzarella, tomato sauce, and basil on thin crust",
      rating: 4.7,
      reviews: 203,
      category: "Pizza",
      addedDate: "2024-01-08",
      orderCount: 3,
    },
    {
      id: 7,
      name: "Chocolate Cupcake",
      price: 3.99,
      image: "/Frame 14.png",
      description: "Rich chocolate cupcake with creamy chocolate frosting",
      rating: 4.6,
      reviews: 89,
      category: "Cupcake",
      addedDate: "2024-01-12",
      orderCount: 2,
    },
    {
      id: 9,
      name: "Chicken Ramen",
      price: 12.99,
      image: "/Frame 14.png",
      description: "Authentic Japanese ramen with tender chicken and rich broth",
      rating: 4.8,
      reviews: 156,
      category: "Ramen",
      addedDate: "2024-01-05",
      orderCount: 4,
    },
    {
      id: 15,
      name: "BBQ Burger",
      price: 10.99,
      image: "/Frame 14.png",
      description: "Smoky BBQ burger with crispy onions and tangy sauce",
      rating: 4.4,
      reviews: 98,
      category: "Burger",
      addedDate: "2024-01-14",
      orderCount: 1,
    },
    {
      id: 20,
      name: "Meat Lovers Pizza",
      price: 15.99,
      image: "/Frame 14.png",
      description: "Loaded with pepperoni, sausage, bacon, and ham",
      rating: 4.6,
      reviews: 167,
      category: "Pizza",
      addedDate: "2024-01-11",
      orderCount: 2,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const categories = ["all", "Burger", "Pizza", "Cupcake", "Ramen"]

  const filteredFavorites = favorites
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.addedDate) - new Date(a.addedDate)
        case "rating":
          return b.rating - a.rating
        case "orders":
          return b.orderCount - a.orderCount
        case "price_low":
          return a.price - b.price
        case "price_high":
          return b.price - a.price
        default:
          return 0
      }
    })

  const removeFavorite = (id) => {
    // Handle removing from favorites
    console.log("Remove from favorites:", id)
  }

  const addToCart = (item) => {
    // Handle adding to cart
    console.log("Add to cart:", item)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="favorites" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Favorites</h1>
          <p className="text-xl text-gray-600">Your most loved dishes, all in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-[#EB5757]">{favorites.length}</div>
            <div className="text-sm text-gray-600">Total Favorites</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-[#EB5757]">
              {favorites.reduce((sum, item) => sum + item.orderCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Times Ordered</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-[#EB5757]">
              {(favorites.reduce((sum, item) => sum + item.rating, 0) / favorites.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-[#EB5757]">
              ${(favorites.reduce((sum, item) => sum + item.price, 0) / favorites.length).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Avg Price</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="recent">Recently Added</option>
              <option value="rating">Highest Rated</option>
              <option value="orders">Most Ordered</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites found</h2>
            <p className="text-gray-600 mb-8">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start adding items to your favorites to see them here"}
            </p>
            <button className="bg-[#EB5757] text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors">
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                  <div className="absolute top-3 left-3 bg-[#EB5757] text-white px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-2xl font-bold text-[#EB5757]">${item.price}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-gray-500">({item.reviews})</span>
                    </div>
                    <div className="text-sm text-gray-500">Ordered {item.orderCount} times</div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Added {new Date(item.addedDate).toLocaleDateString()}</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-[#EB5757] text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
