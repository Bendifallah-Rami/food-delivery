"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Sidebar from "../../../components/dashboard/sidebar"
import DynamicTable from "../../../components/dynamicTable1"
import Toast from "../../../components/form_components/toast"
import { Users, UserCheck, UserX, Plus, Edit, Trash2 } from "lucide-react"

export default function UserList() {
  const router = useRouter()

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Mock data for users
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Main St, City, State",
      status: "Active",
      role: "Customer",
      joinDate: "2024-01-15",
      totalOrders: 23,
      totalSpent: 456.78
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1234567891",
      address: "456 Oak Ave, City, State",
      status: "Active",
      role: "Customer",
      joinDate: "2024-02-20",
      totalOrders: 15,
      totalSpent: 289.50
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1234567892",
      address: "789 Pine Rd, City, State",
      status: "Inactive",
      role: "Customer",
      joinDate: "2024-03-10",
      totalOrders: 8,
      totalSpent: 156.25
    }
  ])

  // Calculate statistics
  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === "Active").length
  const inactiveUsers = users.filter(user => user.status === "Inactive").length

  // Table configuration
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: false },
    { key: "status", label: "Status", sortable: true },
    { key: "totalOrders", label: "Total Orders", sortable: true },
    { key: "totalSpent", label: "Total Spent", sortable: true },
    { key: "joinDate", label: "Join Date", sortable: true },
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

  const handleAddUser = () => {
    router.push("/admin/user/add")
  }

  const handleEditUser = (user) => {
    router.push(`/admin/user/edit/${user.id}`)
  }

  const handleDeleteUser = (user) => {
    showToast(`User ${user.name} deleted successfully`, "success")
  }

//   const actions = [
//     {
//       label: "Edit",
//       icon: Edit,
//       onClick: handleEditUser,
//       color: "text-blue-600 hover:text-blue-800"
//     },
//     {
//       label: "Delete",
//       icon: Trash2,
//       onClick: handleDeleteUser,
//       color: "text-red-600 hover:text-red-800"
//     }
//   ]

const handleEdit = (user) => {
    router.push(`/admin/user/edit/${user.id}`)
    }
const handleDelete = (user) => {
    showToast(`User ${user.name} deleted successfully`, "success")
    // Add your delete logic here
}
const handleAdd = () => {
    router.push("/admin/user/add")
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Head>
        <title>User Management - Fudo Admin</title>
        <meta name="description" content="Manage users in your restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="customers" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>User Management</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">User Management</h1>
           
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Total Users</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{totalUsers}</p>
                </div>
                <div className="bg-[#EB5757] p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Active Users</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{activeUsers}</p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Inactive Users</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{inactiveUsers}</p>
                </div>
                <div className="bg-gray-500 p-3 rounded-full">
                  <UserX className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="">
            <DynamicTable
              data={users}
              columns={columns}
              onEdit={handleEdit}
            onDelete={handleDelete} // Changed to open the confirmation modal
            onAddNew={handleAdd} // Added onAddNew prop for adding new orders
              searchPlaceholder="Search users..."
              itemsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
