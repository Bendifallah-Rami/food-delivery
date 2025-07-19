"use client"

import { useState, useEffect } from "react"
import Sidebar from "../../components/dashboard/sidebar"
import { Search, Filter, Archive, Package, Truck, Box, Calendar, Download, Eye, User, Phone, MapPin, Clock } from "lucide-react"

export default function ArchivesManagement() {
  const [activeTab, setActiveTab] = useState("orders")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [archives, setArchives] = useState({
    orders: [],
    delivery: [],
    stock: []
  })
  const [filteredArchives, setFilteredArchives] = useState({
    orders: [],
    delivery: [],
    stock: []
  })
  const [selectedItem, setSelectedItem] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Mock archived data
  useEffect(() => {
    const mockArchives = {
      orders: [
        {
          id: "ORD12300",
          customerName: "Alice Johnson",
          customerPhone: "+1234567895",
          items: [
            { name: "Chicken Sandwich", quantity: 2, price: 18.98 },
            { name: "Orange Juice", quantity: 1, price: 4.99 }
          ],
          totalAmount: 23.97,
          status: "Completed",
          orderDate: "2024-01-10T12:30:00",
          completedDate: "2024-01-10T13:15:00",
          type: "order"
        },
        {
          id: "ORD12301",
          customerName: "Robert Smith",
          customerPhone: "+1234567896",
          items: [
            { name: "Beef Burger", quantity: 1, price: 16.99 },
            { name: "Fries", quantity: 1, price: 5.99 }
          ],
          totalAmount: 22.98,
          status: "Completed",
          orderDate: "2024-01-09T18:45:00",
          completedDate: "2024-01-09T19:30:00",
          type: "order"
        }
      ],
      delivery: [
        {
          id: "DEL100",
          orderId: "ORD12300",
          customerName: "Alice Johnson",
          customerPhone: "+1234567895",
          customerAddress: "789 Broadway, New York, NY 10003",
          deliveryPartner: "Tom Wilson",
          partnerPhone: "+1987654325",
          finalAmount: 26.96,
          distance: "1.5 km",
          orderTime: "2024-01-10T12:30:00",
          deliveredTime: "2024-01-10T13:15:00",
          status: "Delivered",
          type: "delivery"
        },
        {
          id: "DEL101",
          orderId: "ORD12301",
          customerName: "Robert Smith",
          customerPhone: "+1234567896",
          customerAddress: "456 Fifth Avenue, New York, NY 10018",
          deliveryPartner: "Sarah Davis",
          partnerPhone: "+1987654326",
          finalAmount: 25.97,
          distance: "2.1 km",
          orderTime: "2024-01-09T18:45:00",
          deliveredTime: "2024-01-09T19:30:00",
          status: "Delivered",
          type: "delivery"
        }
      ],
      stock: [
        {
          id: "STK001",
          itemName: "Chicken Breast",
          category: "Meat",
          quantity: 50,
          unit: "kg",
          supplier: "Fresh Meat Co.",
          expiryDate: "2024-01-15",
          archivedDate: "2024-01-10T10:00:00",
          reason: "Expired",
          originalPrice: 15.99,
          type: "stock"
        },
        {
          id: "STK002",
          itemName: "Tomatoes",
          category: "Vegetables",
          quantity: 25,
          unit: "kg",
          supplier: "Garden Fresh Ltd.",
          expiryDate: "2024-01-12",
          archivedDate: "2024-01-09T14:30:00",
          reason: "Expired",
          originalPrice: 8.50,
          type: "stock"
        },
        {
          id: "STK003",
          itemName: "Pizza Dough",
          category: "Bakery",
          quantity: 100,
          unit: "pieces",
          supplier: "Bakery Supply Inc.",
          expiryDate: "2024-01-11",
          archivedDate: "2024-01-08T16:15:00",
          reason: "Expired",
          originalPrice: 2.50,
          type: "stock"
        }
      ]
    }
    
    setArchives(mockArchives)
    setFilteredArchives(mockArchives)
  }, [])

  // Filter archives based on search term and date
  useEffect(() => {
    const currentArchives = archives[activeTab]
    let filtered = currentArchives

    if (searchTerm) {
      filtered = filtered.filter(item => {
        switch (activeTab) {
          case "orders":
            return item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.id.toLowerCase().includes(searchTerm.toLowerCase())
          case "delivery":
            return item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.deliveryPartner.toLowerCase().includes(searchTerm.toLowerCase())
          case "stock":
            return item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
          default:
            return true
        }
      })
    }

    if (dateFilter !== "all") {
      const now = new Date()
      const filterDate = new Date()
      
      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0)
          break
        case "week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          break
      }

      filtered = filtered.filter(item => {
        const itemDate = new Date(
          item.completedDate || item.deliveredTime || item.archivedDate
        )
        return itemDate >= filterDate
      })
    }

    setFilteredArchives(prev => ({
      ...prev,
      [activeTab]: filtered
    }))
  }, [searchTerm, dateFilter, activeTab, archives])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const showItemDetails = (item) => {
    setSelectedItem(item)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedItem(null)
  }

  const exportData = () => {
    const dataToExport = filteredArchives[activeTab]
    const jsonString = JSON.stringify(dataToExport, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}_archives_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getTabStats = () => {
    return {
      orders: archives.orders.length,
      delivery: archives.delivery.length,
      stock: archives.stock.length
    }
  }

  const stats = getTabStats()

  const renderOrdersTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArchives.orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#333333]">{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="text-gray-400 mr-2" size={16} />
                    <div>
                      <div className="text-sm font-medium text-[#333333]">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#333333]">${order.totalAmount.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#333333]">{formatDate(order.orderDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-600">{formatDate(order.completedDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => showItemDetails(order)}
                    className="text-[#EB5757] hover:text-red-700 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderDeliveryTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArchives.delivery.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-[#333333]">{delivery.id}</div>
                    <div className="text-sm text-gray-500">{delivery.orderId}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="text-gray-400 mr-2" size={16} />
                    <div>
                      <div className="text-sm font-medium text-[#333333]">{delivery.customerName}</div>
                      <div className="text-sm text-gray-500">{delivery.customerPhone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Truck className="text-gray-400 mr-2" size={16} />
                    <div>
                      <div className="text-sm font-medium text-[#333333]">{delivery.deliveryPartner}</div>
                      <div className="text-sm text-gray-500">{delivery.partnerPhone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#333333]">${delivery.finalAmount.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#333333]">{delivery.distance}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-600">{formatDate(delivery.deliveredTime)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => showItemDetails(delivery)}
                    className="text-[#EB5757] hover:text-red-700 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderStockTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archived</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArchives.stock.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Box className="text-gray-400 mr-2" size={16} />
                    <div>
                      <div className="text-sm font-medium text-[#333333]">{item.itemName}</div>
                      <div className="text-sm text-gray-500">{item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#333333]">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#333333]">{item.quantity} {item.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#333333]">{item.supplier}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {item.reason}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#333333]">{formatDate(item.archivedDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => showItemDetails(item)}
                    className="text-[#EB5757] hover:text-red-700 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="archives" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Archives</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Archives Management</h1>
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-[#EB5757] text-white rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                >
                  <Download size={16} />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">Archived Orders</p>
                  <p className="text-2xl font-bold text-[#333333]">{stats.orders}</p>
                </div>
                <Package className="text-[#EB5757]" size={24} />
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">Archived Deliveries</p>
                  <p className="text-2xl font-bold text-[#333333]">{stats.delivery}</p>
                </div>
                <Truck className="text-[#EB5757]" size={24} />
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">Archived Stock</p>
                  <p className="text-2xl font-bold text-[#333333]">{stats.stock}</p>
                </div>
                <Box className="text-[#EB5757]" size={24} />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "orders"
                    ? "bg-white text-[#EB5757] shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Package size={16} />
                <span>Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("delivery")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "delivery"
                    ? "bg-white text-[#EB5757] shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Truck size={16} />
                <span>Delivery</span>
              </button>
              <button
                onClick={() => setActiveTab("stock")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "stock"
                    ? "bg-white text-[#EB5757] shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Box size={16} />
                <span>Stock</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all appearance-none bg-white"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "orders" && renderOrdersTable()}
          {activeTab === "delivery" && renderDeliveryTable()}
          {activeTab === "stock" && renderStockTable()}

          {filteredArchives[activeTab].length === 0 && (
            <div className="text-center py-12">
              <Archive className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">No archived {activeTab} found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#333333]">
                  {selectedItem.type === "order" ? "Order" : 
                   selectedItem.type === "delivery" ? "Delivery" : "Stock"} Details
                </h2>
                <button
                  onClick={closeDetailsModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Archive size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {selectedItem.type === "order" && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333] mb-3">Order Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-medium text-[#333333]">{selectedItem.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-medium text-[#333333]">{selectedItem.customerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-[#333333]">{selectedItem.customerPhone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-medium text-[#333333]">${selectedItem.totalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333] mb-3">Order Items</h3>
                      {selectedItem.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-[#333333]">{item.name} x{item.quantity}</span>
                          <span className="font-medium text-[#333333]">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {selectedItem.type === "delivery" && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333] mb-3">Delivery Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Delivery ID</p>
                          <p className="font-medium text-[#333333]">{selectedItem.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-medium text-[#333333]">{selectedItem.orderId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-medium text-[#333333]">{selectedItem.customerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Delivery Partner</p>
                          <p className="font-medium text-[#333333]">{selectedItem.deliveryPartner}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Distance</p>
                          <p className="font-medium text-[#333333]">{selectedItem.distance}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium text-[#333333]">${selectedItem.finalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-[#333333]">{selectedItem.customerAddress}</p>
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.type === "stock" && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#333333] mb-3">Stock Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Item ID</p>
                        <p className="font-medium text-[#333333]">{selectedItem.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Item Name</p>
                        <p className="font-medium text-[#333333]">{selectedItem.itemName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium text-[#333333]">{selectedItem.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-medium text-[#333333]">{selectedItem.quantity} {selectedItem.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Supplier</p>
                        <p className="font-medium text-[#333333]">{selectedItem.supplier}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Original Price</p>
                        <p className="font-medium text-[#333333]">${selectedItem.originalPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expiry Date</p>
                        <p className="font-medium text-red-600">{new Date(selectedItem.expiryDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Archive Reason</p>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {selectedItem.reason}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={closeDetailsModal}
                  className="px-6 py-2 bg-[#EB5757] text-white rounded-lg hover:bg-red-600 transition-colors font-poppins"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
