"use client"

import { useState, useEffect, useCallback } from "react"
import Sidebar from "../../components/dashboard/sidebar"
import DynamicTable from "../../components/dynamicTable1"
import Toast from "../../components/form_components/toast"
import { Search, Filter, MapPin, Clock, User, Phone, Package, Truck, CheckCircle, XCircle, AlertCircle, Eye, Archive, Edit, Trash2 } from "lucide-react"

export default function DeliveryManagement() {
  const [deliveries, setDeliveries] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Mock delivery data
  useEffect(() => {
    const mockDeliveries = [
      {
        id: "DEL001",
        orderId: "ORD12345",
        customerName: "John Doe",
        customerPhone: "+1234567890",
        customerAddress: "123 Main Street, New York, NY 10001",
        items: [
          { name: "Margherita Pizza", quantity: 2, price: 25.98 },
          { name: "Caesar Salad", quantity: 1, price: 12.99 }
        ],
        itemsDisplay: "Margherita Pizza (x2), Caesar Salad (x1)",
        totalAmount: 38.97,
        deliveryFee: 3.99,
        finalAmount: 42.96,
        status: "In Transit",
        priority: "Normal",
        orderTime: "2024-01-15T14:30:00",
        orderTimeDisplay: formatTime("2024-01-15T14:30:00"),
        estimatedDelivery: "2024-01-15T15:15:00",
        deliveryPartner: "Mike Johnson",
        partnerPhone: "+1987654321",
        distance: "2.3 km",
        notes: "Ring doorbell twice, apartment 4B"
      },
      {
        id: "DEL002",
        orderId: "ORD12346",
        customerName: "Sarah Wilson",
        customerPhone: "+1234567891",
        customerAddress: "456 Oak Avenue, Brooklyn, NY 11201",
        items: [
          { name: "Chicken Burger", quantity: 1, price: 15.99 },
          { name: "French Fries", quantity: 1, price: 5.99 },
          { name: "Coca Cola", quantity: 2, price: 4.98 }
        ],
        itemsDisplay: "Chicken Burger (x1), French Fries (x1), Coca Cola (x2)",
        totalAmount: 26.96,
        deliveryFee: 2.99,
        finalAmount: 29.95,
        status: "Delivered",
        priority: "High",
        orderTime: "2024-01-15T13:45:00",
        orderTimeDisplay: formatTime("2024-01-15T13:45:00"),
        estimatedDelivery: "2024-01-15T14:30:00",
        actualDelivery: "2024-01-15T14:25:00",
        deliveryPartner: "Alex Rodriguez",
        partnerPhone: "+1987654322",
        distance: "1.8 km",
        notes: "Leave at door, contactless delivery"
      },
      {
        id: "DEL003",
        orderId: "ORD12347",
        customerName: "David Brown",
        customerPhone: "+1234567892",
        customerAddress: "789 Pine Street, Manhattan, NY 10002",
        items: [
          { name: "Spaghetti Carbonara", quantity: 1, price: 18.99 },
          { name: "Garlic Bread", quantity: 1, price: 6.99 }
        ],
        itemsDisplay: "Spaghetti Carbonara (x1), Garlic Bread (x1)",
        totalAmount: 25.98,
        deliveryFee: 4.99,
        finalAmount: 30.97,
        status: "Preparing",
        priority: "Normal",
        orderTime: "2024-01-15T15:00:00",
        orderTimeDisplay: formatTime("2024-01-15T15:00:00"),
        estimatedDelivery: "2024-01-15T16:00:00",
        deliveryPartner: "Not Assigned",
        partnerPhone: "",
        distance: "3.5 km",
        notes: "Call before delivery"
      },
      {
        id: "DEL004",
        orderId: "ORD12348",
        customerName: "Emma Davis",
        customerPhone: "+1234567893",
        customerAddress: "321 Elm Street, Queens, NY 11101",
        items: [
          { name: "Chicken Tikka Masala", quantity: 1, price: 16.99 },
          { name: "Naan Bread", quantity: 2, price: 7.98 },
          { name: "Basmati Rice", quantity: 1, price: 4.99 }
        ],
        itemsDisplay: "Chicken Tikka Masala (x1), Naan Bread (x2), Basmati Rice (x1)",
        totalAmount: 29.96,
        deliveryFee: 3.99,
        finalAmount: 33.95,
        status: "Cancelled",
        priority: "Normal",
        orderTime: "2024-01-15T12:30:00",
        orderTimeDisplay: formatTime("2024-01-15T12:30:00"),
        estimatedDelivery: "2024-01-15T13:30:00",
        deliveryPartner: "Not Assigned",
        partnerPhone: "",
        distance: "2.8 km",
        notes: "Customer requested cancellation"
      },
      {
        id: "DEL005",
        orderId: "ORD12349",
        customerName: "Michael Lee",
        customerPhone: "+1234567894",
        customerAddress: "654 Maple Drive, Bronx, NY 10451",
        items: [
          { name: "BBQ Ribs", quantity: 1, price: 22.99 },
          { name: "Coleslaw", quantity: 1, price: 4.99 },
          { name: "Cornbread", quantity: 2, price: 6.98 }
        ],
        itemsDisplay: "BBQ Ribs (x1), Coleslaw (x1), Cornbread (x2)",
        totalAmount: 34.96,
        deliveryFee: 4.99,
        finalAmount: 39.95,
        status: "Ready for Pickup",
        priority: "High",
        orderTime: "2024-01-15T15:30:00",
        orderTimeDisplay: formatTime("2024-01-15T15:30:00"),
        estimatedDelivery: "2024-01-15T16:30:00",
        deliveryPartner: "Not Assigned",
        partnerPhone: "",
        distance: "4.2 km",
        notes: "Large order, handle with care"
      }
    ]
    setDeliveries(mockDeliveries)
  }, [])

  const getDeliveryStats = () => {
    const total = deliveries.length
    const delivered = deliveries.filter(d => d.status === "Delivered").length
    const inTransit = deliveries.filter(d => d.status === "In Transit").length
    const preparing = deliveries.filter(d => d.status === "Preparing").length
    const cancelled = deliveries.filter(d => d.status === "Cancelled").length

    return { total, delivered, inTransit, preparing, cancelled }
  }

  const stats = getDeliveryStats()

  // Toast functions
  const showToast = useCallback((message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  // Archive delivered orders older than 24 hours
  const archiveOldDeliveries = async () => {
    setIsArchiving(true)
    
    try {
      const now = new Date()
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      
      const toArchive = deliveries.filter(delivery => {
        if (delivery.status === "Delivered" && delivery.actualDelivery) {
          const deliveryDate = new Date(delivery.actualDelivery)
          return deliveryDate < twentyFourHoursAgo
        }
        return false
      })
      
      if (toArchive.length > 0) {
        // Remove archived deliveries from current list
        const remainingDeliveries = deliveries.filter(delivery => 
          !toArchive.find(archived => archived.id === delivery.id)
        )
        
        setDeliveries(remainingDeliveries)
        
        // In a real app, you would send this to your backend
        console.log(`Archived ${toArchive.length} deliveries:`, toArchive)
        
        // Show success message
        showToast(`Successfully archived ${toArchive.length} old deliveries`, "success")
      } else {
        showToast("No deliveries to archive (no delivered orders older than 24 hours)", "info")
      }
    } catch (error) {
      console.error("Error archiving deliveries:", error)
      showToast("Failed to archive deliveries", "error")
    } finally {
      setIsArchiving(false)
    }
  }

  // Column configuration to hide complex object fields
  const columnConfig = {
    items: { hidden: true },
    customerPhone: { hidden: true },
    customerAddress: { hidden: true },
    totalAmount: { hidden: true },
    deliveryFee: { hidden: true },
    orderTime: { hidden: true },
    estimatedDelivery: { hidden: true },
    actualDelivery: { hidden: true },
    partnerPhone: { hidden: true },
    distance: { hidden: true },
    notes: { hidden: true },
    itemsDisplay: { hidden: true },
    id: { hidden: true }
  }

  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedDelivery(null)
  }

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case "Delivered":
        return `${baseClasses} bg-green-100 text-green-800`
      case "In Transit":
        return `${baseClasses} bg-blue-100 text-blue-800`
      case "Ready for Pickup":
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case "Preparing":
        return `${baseClasses} bg-orange-100 text-orange-800`
      case "Cancelled":
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    switch (priority) {
      case "High":
        return `${baseClasses} bg-red-100 text-red-800`
      case "Normal":
        return `${baseClasses} bg-gray-100 text-gray-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const handleEditDelivery = (delivery) => {
    showToast(`Editing delivery ${delivery.orderId}`, "info")
  }

  const handleDeleteDelivery = (delivery) => {
    showToast(`Delivery ${delivery.orderId} deleted successfully`, "success")
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="delivery" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Delivery Management</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">
                  Delivery Management
                </h1>
                <button
                  onClick={archiveOldDeliveries}
                  disabled={isArchiving}
                  className={`px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-poppins flex items-center space-x-2 ${
                    isArchiving ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isArchiving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Archiving...</span>
                    </>
                  ) : (
                    <>
                      <Archive size={16} />
                      <span>Archive Old Orders</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-[#333333]">
                    {stats.total}
                  </p>
                </div>
                <Package className="text-[#EB5757]" size={24} />
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">
                    Delivered
                  </p>
                  <p className="text-2xl font-bold text-[#333333]">
                    {stats.delivered}
                  </p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">
                    In Transit
                  </p>
                  <p className="text-2xl font-bold text-[#333333]">
                    {stats.inTransit}
                  </p>
                </div>
                <Truck className="text-blue-500" size={24} />
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">
                    Preparing
                  </p>
                  <p className="text-2xl font-bold text-[#333333]">
                    {stats.preparing}
                  </p>
                </div>
                <Clock className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#333333]">
                    Cancelled
                  </p>
                  <p className="text-2xl font-bold text-[#333333]">
                    {stats.cancelled}
                  </p>
                </div>
                <XCircle className="text-red-500" size={24} />
              </div>
            </div>
          </div>

          {/* Deliveries Table */}
          <div className="">
            <DynamicTable
              data={deliveries}
              columnConfig={columnConfig}
              styled={["status", "priority"]}
              searchPlaceholder="Search by customer, order ID, or delivery partner..."
              itemsPerPage={10}
              title="Delivery Management"
               actionColumn={false}    // ✅ Removes action column completely
               showAddButton={false} 
            />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />
    </div>
  );
}
