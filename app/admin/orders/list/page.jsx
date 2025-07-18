"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Sidebar from "../../../components/dashboard/sidebar"
import DynamicTable from "../../../components/dynamicTable1"
import Toast from "../../../components/form_components/toast"
import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign, Package, Plus, Edit, Trash2, Eye } from "lucide-react"

export default function OrdersList() {
  const router = useRouter()

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Mock data for orders
  const [orders] = useState([ 
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customer: "John Doe",
      customerPhone: "+1234567890",
      items: ["Classic Burger", "Fries", "Coca Cola"],
      totalAmount: 24.99,
      status: "Pending",
      orderDate: "2024-01-15",
      deliveryAddress: "123 Main St, City, State",
      paymentMethod: "Credit Card",
      estimatedDelivery: "30 mins",
      notes: "Extra cheese, no onions"
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customer: "rami bendifallah",
      customerPhone: "+1234567891",
      items: ["Margherita Pizza", "Garlic Bread"],
      totalAmount: 32.50,
      status: "Preparing",
      orderDate: "2024-01-15",
      deliveryAddress: "456 Oak Ave, City, State",
      paymentMethod: "PayPal",
      estimatedDelivery: "45 mins",
      notes: "Thin crust pizza"
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      customer: "Mike Johnson",
      customerPhone: "+1234567892",
      items: ["Caesar Salad", "Grilled Chicken"],
      totalAmount: 18.75,
      status: "Delivered",
      orderDate: "2024-01-14",
      deliveryAddress: "789 Pine Rd, City, State",
      paymentMethod: "Cash",
      estimatedDelivery: "Delivered",
      notes: "No croutons"
    },
    {
      id: 4,
      orderNumber: "ORD-2024-004",
      customer: "Sarah Brown",
      customerPhone: "+1234567893",
      items: ["Vegetarian Pasta", "Bread Sticks"],
      totalAmount: 21.25,
      status: "Cancelled",
      orderDate: "2024-01-14",
      deliveryAddress: "321 Elm St, City, State",
      paymentMethod: "Credit Card",
      estimatedDelivery: "Cancelled",
      notes: "Customer requested cancellation"
    }
  ])

  // Calculate statistics
  const totalOrders = orders.length
  const pendingOrders = orders.filter(order => order.status === "Pending").length
  const completedOrders = orders.filter(order => order.status === "Delivered").length
  const cancelledOrders = orders.filter(order => order.status === "Cancelled").length
  const totalRevenue = orders
    .filter(order => order.status === "Delivered")
    .reduce((sum, order) => sum + order.totalAmount, 0)

  // Table configuration
  const columns = [
    { key: "orderNumber", label: "Order #", sortable: true },
    { key: "customer", label: "Customer", sortable: true },
    { key: "totalAmount", label: "Amount", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "orderDate", label: "Date", sortable: true },
    { key: "estimatedDelivery", label: "Delivery", sortable: false },
  ]

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

  const handleAddOrder = () => {
    router.push("/admin/orders/add")
  }

  const handleEditOrder = (order) => {
    router.push(`/admin/orders/edit/${order.id}`)
  }

  const handleViewOrder = (order) => {
    showToast(`Viewing order ${order.orderNumber}`, "info")
  }

  const handleDeleteOrder = (order) => {
    showToast(`Order ${order.orderNumber} deleted successfully`, "success")
  }

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleViewOrder,
      color: "text-blue-600 hover:text-blue-800"
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEditOrder,
      color: "text-green-600 hover:text-green-800"
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDeleteOrder,
      color: "text-red-600 hover:text-red-800"
    }
  ]

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      <Head>
        <title>Orders Management - Fudo Admin</title>
        <meta name="description" content="Manage orders in your restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="orders" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Orders Management</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Orders Management</h1>
                <button
                  onClick={handleAddOrder}
                  className="bg-[#EB5757] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add New Order</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Total Orders</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{totalOrders}</p>
                </div>
                <div className="bg-[#EB5757] p-3 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Pending</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{pendingOrders}</p>
                </div>
                <div className="bg-orange-500 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Completed</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{completedOrders}</p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Cancelled</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{cancelledOrders}</p>
                </div>
                <div className="bg-red-500 p-3 rounded-full">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Revenue</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <DynamicTable
              data={orders}
              columns={columns}
              actions={actions}
              searchPlaceholder="Search orders..."
              itemsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
