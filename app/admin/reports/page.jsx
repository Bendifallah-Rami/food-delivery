"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../../components/dashboard/sidebar"
import Toast from "../../components/form_components/toast"
import DropdownField from "../../components/form_components/dropdown_field"
import FormSection from "../../components/form_components/form_section"
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  Clock,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"

export default function ReportsPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // State for report filters
  const [filters, setFilters] = useState({
    period: "Today",
    category: "All Categories",
    status: "All Statuses"
  })

  // Mock data for reports
  const [reportData] = useState({
    daily: {
      revenue: 2547.89,
      orders: 34,
      customers: 28,
      avgOrderValue: 74.94,
      topSellingItems: [
        { name: "Classic Burger", quantity: 12, revenue: 155.88 },
        { name: "Margherita Pizza", quantity: 8, revenue: 148.00 },
        { name: "Caesar Salad", quantity: 6, revenue: 59.94 },
        { name: "Chicken Wings", quantity: 5, revenue: 74.95 }
      ],
      hourlyData: [
        { hour: "9:00", orders: 2, revenue: 45.98 },
        { hour: "10:00", orders: 3, revenue: 67.47 },
        { hour: "11:00", orders: 4, revenue: 89.96 },
        { hour: "12:00", orders: 8, revenue: 234.72 },
        { hour: "13:00", orders: 6, revenue: 178.74 },
        { hour: "14:00", orders: 3, revenue: 89.97 },
        { hour: "15:00", orders: 2, revenue: 45.98 },
        { hour: "16:00", orders: 1, revenue: 22.99 },
        { hour: "17:00", orders: 2, revenue: 45.98 },
        { hour: "18:00", orders: 3, revenue: 67.47 }
      ]
    },
    monthly: {
      revenue: 76436.70,
      orders: 1023,
      customers: 856,
      avgOrderValue: 74.74,
      growth: 12.5,
      dailyAverages: {
        revenue: 2547.89,
        orders: 34.1,
        customers: 28.5
      }
    },
    yearly: {
      revenue: 917240.40,
      orders: 12276,
      customers: 10272,
      avgOrderValue: 74.71,
      growth: 18.2,
      monthlyData: [
        { month: "Jan", revenue: 76436, orders: 1023 },
        { month: "Feb", revenue: 69234, orders: 926 },
        { month: "Mar", revenue: 78945, orders: 1056 },
        { month: "Apr", revenue: 74523, orders: 998 },
        { month: "May", revenue: 81234, orders: 1087 },
        { month: "Jun", revenue: 77896, orders: 1043 },
        { month: "Jul", revenue: 83421, orders: 1117 },
        { month: "Aug", revenue: 79865, orders: 1069 },
        { month: "Sep", revenue: 76543, orders: 1025 },
        { month: "Oct", revenue: 82109, orders: 1099 },
        { month: "Nov", revenue: 78432, orders: 1051 },
        { month: "Dec", revenue: 89142, orders: 1194 }
      ]
    },
    categoryBreakdown: [
      { category: "Main Course", percentage: 35, revenue: 891.76, orders: 12 },
      { category: "Pizza", percentage: 25, revenue: 637.00, orders: 8 },
      { category: "Appetizer", percentage: 15, revenue: 382.18, orders: 5 },
      { category: "Beverage", percentage: 12, revenue: 305.75, orders: 4 },
      { category: "Dessert", percentage: 8, revenue: 203.83, orders: 3 },
      { category: "Salad", percentage: 5, revenue: 127.37, orders: 2 }
    ],
    staffPerformance: [
      { name: "Alex Johnson", orders: 28, revenue: 2089.72, rating: 4.8 },
      { name: "Sarah Wilson", orders: 24, revenue: 1789.36, rating: 4.9 },
      { name: "Mike Davis", orders: 18, revenue: 1342.58, rating: 4.6 },
      { name: "Emily Brown", orders: 15, revenue: 1118.82, rating: 4.7 }
    ],
    customerStats: {
      newCustomers: 8,
      returningCustomers: 20,
      retentionRate: 71.4,
      avgOrdersPerCustomer: 1.2
    }
  })

  const periodOptions = [
    "Today",
    "Yesterday", 
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Year",
    "Custom"
  ]

  const categoryOptions = [
    "All Categories",
    "Main Course",
    "Pizza",
    "Appetizer",
    "Beverage",
    "Dessert",
    "Salad"
  ]

  const statusOptions = [
    "All Statuses",
    "Completed",
    "Pending",
    "Cancelled"
  ]

  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }, [])

  useEffect(() => {
    setIsMounted(true)
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

  const handleExportReport = () => {
    showToast("Report exported successfully!", "success")
  }

  const getCurrentData = () => {
    switch (filters.period) {
      case "Today":
      case "Yesterday":
        return reportData.daily
      case "This Month":
      case "Last Month":
        return reportData.monthly
      case "This Year":
        return reportData.yearly
      default:
        return reportData.daily
    }
  }

  const currentData = getCurrentData()

  if (!isMounted) {
    return (
      <div className="flex min-h-screen bg-white overflow-hidden">
        <Sidebar activeItem="reports" />
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 lg:p-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="reports" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Reports & Analytics</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Reports & Analytics</h1>
                <button
                  onClick={handleExportReport}
                  className="bg-[#EB5757] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                >
                  <Download size={16} />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <FormSection title="Report Filters">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DropdownField
                  title="Time Period"
                  value={filters.period}
                  onChange={(value) => handleFilterChange("period", value)}
                  options={periodOptions}
                />
                
                <DropdownField
                  title="Category"
                  value={filters.category}
                  onChange={(value) => handleFilterChange("category", value)}
                  options={categoryOptions}
                />
                
                <DropdownField
                  title="Order Status"
                  value={filters.status}
                  onChange={(value) => handleFilterChange("status", value)}
                  options={statusOptions}
                />
              </div>
            </div>
          </FormSection>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">${currentData.revenue?.toLocaleString() || '0'}</p>
                  {currentData.growth && (
                    <p className="text-sm text-green-600 font-poppins flex items-center mt-1">
                      <TrendingUp size={12} className="mr-1" />
                      +{currentData.growth}%
                    </p>
                  )}
                </div>
                <div className="bg-[#EB5757] p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Total Orders</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{currentData.orders?.toLocaleString() || '0'}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Customers</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">{currentData.customers?.toLocaleString() || '0'}</p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-[#EB5757]/10 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">Avg Order Value</p>
                  <p className="text-2xl font-bold text-[#333333] font-poppins">${currentData.avgOrderValue?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          {filters.period === "Today" && reportData.daily.hourlyData && (
            <FormSection title="Today's Hourly Sales">
              <div className="p-6">
                <div className="h-64 flex items-end justify-between space-x-2">
                  {reportData.daily.hourlyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-[#EB5757] rounded-t-md w-full flex items-end justify-center text-white text-xs font-poppins"
                        style={{ height: `${(data.revenue / 250) * 100}%`, minHeight: '20px' }}
                      >
                        ${data.revenue}
                      </div>
                      <div className="text-xs text-gray-600 mt-2 font-poppins">{data.hour}</div>
                      <div className="text-xs text-gray-500 font-poppins">{data.orders} orders</div>
                    </div>
                  ))}
                </div>
              </div>
            </FormSection>
          )}

          {/* Monthly/Yearly Chart */}
          {filters.period === "This Year" && reportData.yearly.monthlyData && (
            <FormSection title="Monthly Revenue Trend">
              <div className="p-6">
                <div className="h-64 flex items-end justify-between space-x-2">
                  {reportData.yearly.monthlyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-[#EB5757] rounded-t-md w-full flex items-end justify-center text-white text-xs font-poppins"
                        style={{ height: `${(data.revenue / 90000) * 100}%`, minHeight: '20px' }}
                      >
                        ${(data.revenue / 1000).toFixed(0)}k
                      </div>
                      <div className="text-xs text-gray-600 mt-2 font-poppins">{data.month}</div>
                      <div className="text-xs text-gray-500 font-poppins">{data.orders} orders</div>
                    </div>
                  ))}
                </div>
              </div>
            </FormSection>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Selling Items */}
            {reportData.daily.topSellingItems && (
              <FormSection title="Top Selling Items Today">
                <div className="p-6">
                  <div className="space-y-4">
                    {reportData.daily.topSellingItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#EB5757] rounded-full flex items-center justify-center text-white font-bold text-sm font-poppins mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-[#333333] font-poppins">{item.name}</h4>
                            <p className="text-sm text-gray-600 font-poppins">{item.quantity} sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#333333] font-poppins">${item.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FormSection>
            )}

            {/* Category Breakdown */}
            <FormSection title="Sales by Category">
              <div className="p-6">
                <div className="space-y-3">
                  {reportData.categoryBreakdown.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <span className="font-medium text-[#333333] font-poppins w-24">{category.category}</span>
                        <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#EB5757] h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 font-poppins w-12">{category.percentage}%</span>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-[#333333] font-poppins">${category.revenue}</p>
                        <p className="text-sm text-gray-600 font-poppins">{category.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FormSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Staff Performance */}
            <FormSection title="Staff Performance Today">
              <div className="p-6">
                <div className="space-y-4">
                  {reportData.staffPerformance.map((staff, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#EB5757] rounded-full flex items-center justify-center text-white font-bold font-poppins mr-3">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-[#333333] font-poppins">{staff.name}</h4>
                          <p className="text-sm text-gray-600 font-poppins">Rating: {staff.rating}/5.0</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#333333] font-poppins">${staff.revenue}</p>
                        <p className="text-sm text-gray-600 font-poppins">{staff.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FormSection>

            {/* Customer Analytics */}
            <FormSection title="Customer Analytics">
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600 font-poppins">{reportData.customerStats.newCustomers}</p>
                    <p className="text-sm text-gray-600 font-poppins">New Customers</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600 font-poppins">{reportData.customerStats.returningCustomers}</p>
                    <p className="text-sm text-gray-600 font-poppins">Returning</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#333333] font-poppins">Retention Rate</span>
                    <span className="font-bold text-[#333333] font-poppins">{reportData.customerStats.retentionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#EB5757] h-2 rounded-full" 
                      style={{ width: `${reportData.customerStats.retentionRate}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-medium text-[#333333] font-poppins">Avg Orders/Customer</span>
                    <span className="font-bold text-[#333333] font-poppins">{reportData.customerStats.avgOrdersPerCustomer}</span>
                  </div>
                </div>
              </div>
            </FormSection>
          </div>

          {/* Summary Stats */}
          {filters.period !== "Today" && (
            <FormSection title="Period Summary">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentData.dailyAverages && (
                    <>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-[#333333] font-poppins">${currentData.dailyAverages.revenue}</p>
                        <p className="text-sm text-gray-600 font-poppins">Daily Avg Revenue</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-[#333333] font-poppins">{currentData.dailyAverages.orders}</p>
                        <p className="text-sm text-gray-600 font-poppins">Daily Avg Orders</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-[#333333] font-poppins">{currentData.dailyAverages.customers}</p>
                        <p className="text-sm text-gray-600 font-poppins">Daily Avg Customers</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </FormSection>
          )}
        </div>
      </div>
    </div>
  )
}
