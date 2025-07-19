"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Sidebar from "../../../components/dashboard/sidebar"
import DynamicTable from "../../../components/dynamicTable1"
import Toast from "../../../components/form_components/toast"
import { Users, UserCheck, UserX, Clock, Plus, Edit, Trash2 } from "lucide-react"

export default function StaffList() {
  const router = useRouter()

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Mock data for staff
  const [staff] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@restaurant.com",
      phone: "+1234567890",
      position: "Chef",
      department: "Kitchen",
      status: "Active",
      shift: "Morning",
      hireDate: "2024-01-15",
      salary: "$45,000",
      manager: "Head Chef"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@restaurant.com",
      phone: "+1234567891",
      position: "Waitress",
      department: "Service",
      status: "Active",
      shift: "Evening",
      hireDate: "2024-02-20",
      salary: "$32,000",
      manager: "Service Manager"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@restaurant.com",
      phone: "+1234567892",
      position: "Cashier",
      department: "Front Desk",
      status: "On Leave",
      shift: "Night",
      hireDate: "2024-03-10",
      salary: "$28,000",
      manager: "Front Desk Manager"
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@restaurant.com",
      phone: "+1234567893",
      position: "Sous Chef",
      department: "Kitchen",
      status: "Active",
      shift: "Morning",
      hireDate: "2024-01-20",
      salary: "$38,000",
      manager: "Head Chef"
    }
  ])

  // Calculate statistics
  const totalStaff = staff.length
  const activeStaff = staff.filter(member => member.status === "Active").length
  const onLeaveStaff = staff.filter(member => member.status === "On Leave").length
  const morningShift = staff.filter(member => member.shift === "Morning").length

  // Table configuration
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "position", label: "Position", sortable: true },
    { key: "department", label: "Department", sortable: true },
    { key: "shift", label: "Shift", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "hireDate", label: "Hire Date", sortable: true },
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

  const handleAddStaff = () => {
    router.push("/admin/staff/add")
  }

  const handleEditStaff = (staffMember) => {
    router.push(`/admin/staff/edit/${staffMember.id}`)
  }

  const handleDeleteStaff = (staffMember) => {
    showToast(`Staff member ${staffMember.name} removed successfully`, "success")
  }

  const actions = [
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEditStaff,
      color: "text-blue-600 hover:text-blue-800"
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDeleteStaff,
      color: "text-red-600 hover:text-red-800"
    }
  ]

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      <Head>
        <title>Staff Management - Fudo Admin</title>
        <meta name="description" content="Manage staff in your restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="staff" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Staff Management</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Staff Management</h1>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Total Staff</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{totalStaff}</p>
                </div>
                <div className="bg-[#EB5757] p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Active Staff</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{activeStaff}</p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">On Leave</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{onLeaveStaff}</p>
                </div>
                <div className="bg-yellow-500 p-3 rounded-full">
                  <UserX className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 rounded-xl shadow-sm p-6 border border-[#EB5757]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Morning Shift</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{morningShift}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Staff Table */}
          <div className="">
            <DynamicTable
              data={staff}
              columns={columns}
              actions={actions}
              searchPlaceholder="Search staff..."
              itemsPerPage={10}
                onAddNew={handleAddStaff}
                onEdit={handleEditStaff}
                onDelete={handleDeleteStaff}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
