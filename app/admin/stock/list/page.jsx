"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import DynamicTable from "../../../components/dynamicTable1"
import Sidebar from "../../../components/dashboard/sidebar"
import Toast from "../../../components/dashboard/toast"
import { UtensilsCrossed, Package, CheckCircle, XCircle, AlertTriangle, Clock, Archive } from "lucide-react"

export default function MenuManagement() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })
  const [isArchiving, setIsArchiving] = useState(false)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // State for storing menu item statistics
  const [menuData, setMenuData] = useState({
    totalItems: 0,
    available: 0,
    lowStock: 0,
    outOfStock: 0,
    loading: true,
    error: null,
  })

  // Initialize with mock food delivery menu data
  useEffect(() => {
    const initializeMenuData = () => {
      setLoading(true)
      
      // Mock menu items data for food delivery
      const mockMenuItems = [
        { 
          id: 1, 
          itemCode: "FOOD001", 
          name: "Classic Burger", 
          category: "Main Course", 
          price: "$12.99", 
          stock: 25, 
          status: "Available",
          description: "Juicy beef patty with fresh lettuce and tomato",
          lastUpdated: "2024-01-10T10:30:00"
        },
        { 
          id: 2, 
          itemCode: "FOOD002", 
          name: "Margherita Pizza", 
          category: "Pizza", 
          price: "$18.50", 
          stock: 15, 
          status: "Available",
          description: "Classic pizza with fresh mozzarella and basil",
          lastUpdated: "2024-01-12T14:20:00"
        },
        { 
          id: 3, 
          itemCode: "FOOD003", 
          name: "Chicken Wings", 
          category: "Appetizer", 
          price: "$8.99", 
          stock: 5, 
          status: "Low Stock",
          description: "Crispy wings with your choice of sauce",
          lastUpdated: "2024-01-08T09:15:00"
        },
        { 
          id: 4, 
          itemCode: "FOOD004", 
          name: "Caesar Salad", 
          category: "Salad", 
          price: "$7.99", 
          stock: 20, 
          status: "Available",
          description: "Fresh romaine lettuce with Caesar dressing",
          lastUpdated: "2024-01-14T16:45:00"
        },
        { 
          id: 5, 
          itemCode: "FOOD005", 
          name: "Fish Tacos", 
          category: "Main Course", 
          price: "$14.99", 
          stock: 0, 
          status: "Out of Stock",
          description: "Grilled fish with cabbage slaw and chipotle mayo",
          lastUpdated: "2024-01-05T11:30:00"
        },
        { 
          id: 6, 
          itemCode: "FOOD006", 
          name: "Chocolate Cake", 
          category: "Dessert", 
          price: "$6.99", 
          stock: 12, 
          status: "Available",
          description: "Rich chocolate cake with chocolate frosting",
          lastUpdated: "2024-01-13T13:20:00"
        },
        { 
          id: 7, 
          itemCode: "FOOD007", 
          name: "Veggie Burger", 
          category: "Main Course", 
          price: "$11.99", 
          stock: 3, 
          status: "Low Stock",
          description: "Plant-based patty with fresh vegetables",
          lastUpdated: "2024-01-07T08:45:00"
        },
        { 
          id: 8, 
          itemCode: "FOOD008", 
          name: "Buffalo Wings", 
          category: "Appetizer", 
          price: "$9.99", 
          stock: 18, 
          status: "Available",
          description: "Spicy buffalo wings with blue cheese dip",
          lastUpdated: "2024-01-11T12:15:00"
        },
        { 
          id: 9, 
          itemCode: "FOOD009", 
          name: "Pasta Carbonara", 
          category: "Main Course", 
          price: "$16.99", 
          stock: 8, 
          status: "Available",
          description: "Creamy pasta with bacon and parmesan",
          lastUpdated: "2024-01-09T15:30:00"
        },
        { 
          id: 10, 
          itemCode: "FOOD010", 
          name: "Iced Coffee", 
          category: "Beverage", 
          price: "$3.99", 
          stock: 0, 
          status: "Out of Stock",
          description: "Cold brew coffee with ice",
          lastUpdated: "2024-01-06T07:20:00"
        },
      ]

      // Process the data to match the table structure
      const processedData = mockMenuItems.map((item) => ({
        id: item.id,
        "Item Code": item.itemCode,
        "Name": item.name,
        "Category": item.category,
        "Price": item.price,
        "Stock": item.stock,
        "Status": item.status,
        description: item.description,
      }))

      setData(processedData)

      // Calculate statistics
      const totalItems = processedData.length
      const available = processedData.filter((item) => item.Status === "Available").length
      const lowStock = processedData.filter((item) => item.Status === "Low Stock").length
      const outOfStock = processedData.filter((item) => item.Status === "Out of Stock").length

      setMenuData({
        totalItems,
        available,
        lowStock,
        outOfStock,
        loading: false,
        error: null,
      })

      setLoading(false)
    }

    // Simulate API call delay
    setTimeout(initializeMenuData, 1000)
  }, [])

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

  // Handle edit menu item
  const handleEdit = (row) => {
    router.push(`edit/${row.id}`)
  }

  // Handle add menu item
  const handleAdd = () => {
    router.push(`add`)
  }

  // Handle delete confirmation
  const confirmDelete = (row) => {
    setDeleteModal({ isOpen: true, item: row })
  }

  // Handle actual deletion
  const handleDelete = async () => {
    try {
      const item = deleteModal.item
      if (!item) return

      // Remove the deleted item from the state
      setData((prevData) => prevData.filter((menuItem) => menuItem.id !== item.id))

      // Update statistics
      setMenuData((prev) => {
        const status = item.Status
        return {
          ...prev,
          totalItems: prev.totalItems - 1,
          available: status === "Available" ? prev.available - 1 : prev.available,
          lowStock: status === "Low Stock" ? prev.lowStock - 1 : prev.lowStock,
          outOfStock: status === "Out of Stock" ? prev.outOfStock - 1 : prev.outOfStock,
        }
      })

      // Close modal
      setDeleteModal({ isOpen: false, item: null })

      // Show success toast
      showToast("Menu item deleted successfully", "success")
    } catch (error) {
      console.error("Error deleting menu item:", error)
      showToast("Failed to delete menu item", "error")
      setDeleteModal({ isOpen: false, item: null })
    }
  }

  // Archive old out of stock items older than 30 days
  const archiveOldItems = async () => {
    setIsArchiving(true)
    
    try {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      
      const toArchive = data.filter(item => {
        if (item.Status === "Out of Stock" && item.lastUpdated) {
          const lastUpdatedDate = new Date(item.lastUpdated)
          return lastUpdatedDate < thirtyDaysAgo
        }
        return false
      })
      
      if (toArchive.length > 0) {
        // Remove archived items from current list
        const remainingItems = data.filter(item => 
          !toArchive.find(archived => archived.id === item.id)
        )
        
        setData(remainingItems)
        
        // Update statistics
        setMenuData(prev => ({
          ...prev,
          totalItems: remainingItems.length,
          outOfStock: remainingItems.filter(item => item.Status === "Out of Stock").length
        }))
        
        // In a real app, you would send this to your backend
        console.log(`Archived ${toArchive.length} items:`, toArchive)
        
        // Show success message
        showToast(`Successfully archived ${toArchive.length} old out-of-stock items`, "success")
      } else {
        showToast("No items to archive (no out-of-stock items older than 30 days)", "info")
      }
    } catch (error) {
      console.error("Error archiving items:", error)
      showToast("Failed to archive items", "error")
    } finally {
      setIsArchiving(false)
    }
  }

  // Generate stats cards data
  const stats = [
    {
      title: "Total Menu Items",
      count: menuData.totalItems,
      increase: "Items",
      icon: <UtensilsCrossed className="h-5 w-5 text-[#EB5757]" />,
    },
    {
      title: "Available Items",
      count: menuData.available,
      increase: "Items",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Low Stock",
      count: menuData.lowStock,
      increase: "Items",
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
    },
    {
      title: "Out of Stock",
      count: menuData.outOfStock,
      increase: "Items",
      icon: <XCircle className="h-5 w-5 text-red-600" />,
    },
  ]

  // Custom delete confirmation modal
  const DeleteConfirmationModal = () => {
    if (!deleteModal.isOpen) return null
    const item = deleteModal.item

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="mr-4 bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-[#EB5757]" />
            </div>
            <h3 className="text-lg font-medium text-[#333333] font-poppins">
              Confirm Menu Item Deletion
            </h3>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4 font-poppins">
              {`Are you sure you want to delete "${item?.["Name"] || ""}"? This action cannot be undone.`}
            </p>

            <div className="bg-[#FEE9DE] p-3 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm font-medium text-[#333333] font-poppins">Item Code:</span>
                <span className="text-sm text-[#333333] font-poppins">{item?.["Item Code"]}</span>

                <span className="text-sm font-medium text-[#333333] font-poppins">Name:</span>
                <span className="text-sm text-[#333333] font-poppins">{item?.["Name"]}</span>

                <span className="text-sm font-medium text-[#333333] font-poppins">Category:</span>
                <span className="text-sm text-[#333333] font-poppins">{item?.["Category"]}</span>

                <span className="text-sm font-medium text-[#333333] font-poppins">Status:</span>
                <span className="text-sm text-[#333333] font-poppins">{item?.["Status"]}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteModal({ isOpen: false, item: null })}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-[#333333] rounded-md transition-colors font-poppins"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-[#EB5757] hover:bg-red-600 text-white rounded-md transition-colors font-poppins"
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      <Head>
        <title>Menu Management - Fudo Admin</title>
        <meta name="description" content="Manage your restaurant menu items" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="menu" />

      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          
          {/* Header Section */}
          <div className="mb-8 ">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Menu Management</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Menu Items</h1>
                <button
                  onClick={archiveOldItems}
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
                      <span>Archive Old Items</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#333333] font-poppins">{stat.count}</h3>
                      <p className="text-sm text-gray-600 font-poppins mt-1 ">{stat.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB5757] mx-auto mb-4"></div>
                <p className="text-lg text-[#333333] font-poppins">Loading menu items...</p>
              </div>
            </div>
          ) : (
            <div className="">
              <DynamicTable
                data={data}
                title="Menu Items Management"
                columnConfig={{
                  id: { hidden: true }, // Hide ID column
                  "Item Code": { title: "Item Code" },
                  "Name": { title: "Name" },
                  "Category": { title: "Category" },
                  "Price": { title: "Price" },
                  "Stock": { title: "Stock Quantity" },
                  "Status": { title: "Status" },
                  description: { hidden: true }, // Hide description column
                  lastUpdated: { hidden: true }, // Hide lastUpdated column
                }}
                addButtonText="Add Menu Item"
                dropdownFields={["Category", "Status"]}
                onEdit={handleEdit}
                onDelete={confirmDelete}
                onAddNew={handleAdd}
                styled={["Status"]}
              />
            </div>
          )}

          {/* Render the delete confirmation modal */}
          <DeleteConfirmationModal />
        </div>
      </div>
    </div>
  )
}
