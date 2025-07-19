"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import DynamicTable from "../../components/dynamicTable1";
import EquipmentStatusChart from "../../components/dashboard/equipmentStatusChart";
import StateCards from "../../components/dashboard/stateCard";
import NotificationAndCreateUserCards from "../../components/dashboard/notcraete";
import DynamicPieChart from "../../components/dashboard/pie";
import { useRouter } from "next/navigation";
import { AlertTriangle, X } from 'lucide-react';
import Toast from "@/app/components/dashboard/toast";
import Sidebar from "../../components/dashboard/sidebar"




const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop"); // 'mobile', 'tablet', 'desktop'
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([])
  // State for food delivery data
  const [staff, setStaff] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("Admin")
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, order: null });
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  
  // State for storing order statistics
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    loading: false,
    error: null,
  })


  // Initialize with food delivery mock data
  useEffect(() => {
    const initializeFoodDeliveryData = () => {
      // Mock staff data
      const mockStaff = [
        { id: 1, name: "Ahmed Hassan", role: "Chef", email: "ahmed@fudo.com", status: "Active" },
        { id: 2, name: "Sarah Wilson", role: "Delivery Driver", email: "sarah@fudo.com", status: "Active" },
        { id: 3, name: "Mike Johnson", role: "Kitchen Assistant", email: "mike@fudo.com", status: "Active" },
        { id: 4, name: "Lisa Garcia", role: "Delivery Driver", email: "lisa@fudo.com", status: "On Break" },
        { id: 5, name: "Omar Ali", role: "Manager", email: "omar@fudo.com", status: "Active" },
      ];

      // Mock customers data
      const mockCustomers = [
        { id: 1, name: "John Smith", email: "john@email.com", phone: "+1234567890", totalOrders: 15 },
        { id: 2, name: "Emma Davis", email: "emma@email.com", phone: "+1234567891", totalOrders: 8 },
        { id: 3, name: "David Brown", email: "david@email.com", phone: "+1234567892", totalOrders: 23 },
      ];

      // Mock orders data
      const mockOrders = [
        { 
          id: 1, 
          order_code: "ORD-001",
          customerName: "John Smith", 
          items: "2x Burger Deluxe, 1x Fries", 
          location: "123 Main St", 
          driverName: "Sarah Wilson", 
          status: "Preparing", 
          priority: "High",
          createdAt: "Dec 15, 2024",
          total: "$24.99",
          description: "Extra cheese, no onions"
        },
        { 
          id: 2, 
          order_code: "ORD-002",
          customerName: "Emma Davis", 
          items: "1x Pizza Margherita, 2x Soda", 
          location: "456 Oak Ave", 
          driverName: "Lisa Garcia", 
          status: "Out for Delivery", 
          priority: "Medium",
          createdAt: "Dec 15, 2024",
          total: "$18.50",
          description: "Ring doorbell twice"
        },
        { 
          id: 3, 
          order_code: "ORD-003",
          customerName: "David Brown", 
          items: "3x Chicken Wings, 1x Salad", 
          location: "789 Pine St", 
          driverName: "Sarah Wilson", 
          status: "Delivered", 
          priority: "Low",
          createdAt: "Dec 14, 2024",
          total: "$32.75",
          description: "Leave at door"
        },
      ];

      // Mock menu items data
      const mockMenuItems = [
        { id: 1, name: "Burger Deluxe", category: "Main", status: "Available", price: "$12.99" },
        { id: 2, name: "Pizza Margherita", category: "Main", status: "Available", price: "$18.50" },
        { id: 3, name: "Chicken Wings", category: "Appetizer", status: "Low Stock", price: "$8.99" },
        { id: 4, name: "Caesar Salad", category: "Salad", status: "Available", price: "$7.99" },
      ];

      // Mock deliveries data
      const mockDeliveries = [
        { id: 1, delivery_status: "Delivered" },
        { id: 2, delivery_status: "In Transit" },
        { id: 3, delivery_status: "Pending" },
        { id: 4, delivery_status: "Cancelled" },
      ];

      setStaff(mockStaff);
      setCustomers(mockCustomers);
      setOrders(mockOrders);
      setMenuItems(mockMenuItems);
      setDeliveries(mockDeliveries);
      setData(mockOrders);

      // Calculate statistics
      const totalOrders = mockOrders.length;
      const pendingOrders = mockOrders.filter(
        (order) => order.status === "Preparing" || order.status === "Out for Delivery",
      ).length;
      const completedOrders = mockOrders.filter((order) => order.status === "Delivered").length;

      setOrderStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        loading: false,
        error: null,
      });
    };

    initializeFoodDeliveryData();
  }, []);

    const showToast = (message, type = "success") => {
      setToast({
        visible: true,
        message,
        type,
      });
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
    };

    const hideToast = () => {
      setToast((prev) => ({ ...prev, visible: false }));
    };
  
  // Handle edit order
  const handleEdit = (row) => {
    showToast("Edit functionality would navigate to edit order page", "info");
  };

  // Handle add order
  const handleAdd = () => {
    showToast("Add functionality would navigate to new order page", "info");
  };

  // Handle accept order
  const handleAccept = (row) => {
    const updatedData = data.map((order) => 
      order.id === row.id ? { ...order, status: "Confirmed" } : order
    );
    setData(updatedData);
    showToast("Order confirmed successfully", "success");
  }

  // Handle cancel order
  const handleReject = (row) => {
    const updatedData = data.map((order) => 
      order.id === row.id ? { ...order, status: "Cancelled" } : order
    );
    setData(updatedData);
    showToast("Order cancelled successfully", "success");
  }

  // Handle delete confirmation
  const confirmDelete = (row) => {
    setDeleteModal({ isOpen: true, order: row });
  };

  // Handle actual deletion
  const handleDelete = () => {
    const row = deleteModal.order;
    if (!row) return;

    // Remove the deleted order from the state
    setData((prevData) => prevData.filter((order) => order.id !== row.id));

    // Update statistics
    setOrderStats((prev) => ({
      ...prev,
      totalOrders: prev.totalOrders - 1,
      pendingOrders: row.status === "Preparing" ? prev.pendingOrders - 1 : prev.pendingOrders,
      completedOrders: 
        row.status === "Delivered" || row.status === "Cancelled" ? prev.completedOrders - 1 : prev.completedOrders,
    }));

    // Close modal
    setDeleteModal({ isOpen: false, order: null });
    showToast("Order deleted successfully", "success");
  };

  // Custom delete confirmation modal
  const DeleteConfirmationModal = () => {
    if (!deleteModal.isOpen) return null;
    const order = deleteModal.order;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border border-neutral-200">
          <div className="flex items-center mb-4">
            <div className="mr-4 bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-[#EB5757]" />
            </div>
            <h3 className="text-lg font-medium text-[#333333] font-poppins">
              Confirm Order Deletion
            </h3>
          </div>
         
          <div className="mb-6">
            <p className="text-neutral-700 mb-4 font-poppins">
              {`Are you sure you want to delete order "${order?.order_code || ""}"? This action cannot be undone.`}
            </p>

            <div className="bg-[#FEE9DE] p-3 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm font-medium text-[#333333] font-poppins">Order:</span>
                <span className="text-sm text-[#333333] font-poppins">{order?.order_code}</span>

                <span className="text-sm font-medium text-[#333333] font-poppins">Customer:</span>
                <span className="text-sm text-[#333333] font-poppins">{order?.customerName}</span>

                <span className="text-sm font-medium text-[#333333] font-poppins">Status:</span>
                <span className="text-sm text-[#333333] font-poppins">{order?.status}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteModal({ isOpen: false, order: null })}
              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-[#333333] rounded-md transition-colors font-poppins"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-[#EB5757] hover:bg-red-700 text-white rounded-md transition-colors font-poppins"
            >
              Delete Order
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
        setIsMobile(false);
      } else {
        setScreenSize("desktop");
        setIsMobile(false);
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (screenSize === "desktop") {
      setIsMobileMenuOpen(false);
    }
  }, [screenSize]);

  // Process menu items data for availability chart
  const getMenuAvailabilityData = () => {
    if (!menuItems.length)
      return [
        { name: "Available", value: 12 },
        { name: "Low Stock", value: 3 },
        { name: "Out of Stock", value: 1 },
      ];

    const statusCounts = {
      Available: 0,
      "Low Stock": 0,
      "Out of Stock": 0,
    };

    menuItems.forEach((item) => {
      if (item.status in statusCounts) {
        statusCounts[item.status]++;
      }
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Process order data for priority chart
  const getOrderPriorityData = () => {
    if (!orders.length)
      return [
        { name: "High", value: 8 },
        { name: "Medium", value: 15 },
        { name: "Low", value: 5 },
      ];

    const priorityCounts = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    orders.forEach((order) => {
      if (order.priority in priorityCounts) {
        priorityCounts[order.priority]++;
      }
    });

    return [
      {
        name:"High",
        value: priorityCounts.High,
      },
      {
        name: "Medium",
        value: priorityCounts.Medium,
      },
      {
        name: "Low",
        value: priorityCounts.Low,
      },
    ];
  };

  // Process delivery data for status chart
  const getDeliveryStatusData = () => {
    if (!deliveries.length)
      return [
        { name: "Delivered", count: 85, color: "#4ade80" },
        { name: "In Transit", count: 25, color: "#f59e0b" },
        { name: "Preparing", count: 12, color: "#3b82f6" },
        { name: "Cancelled", count: 3, color: "#EB5757" },
        { name: "Pending", count: 8, color: "#6b7280" },
      ];

    const statusCounts = {
      Delivered: { count: 0, color: "#4ade80" },
      "In Transit": { count: 0, color: "#f59e0b" },
      Preparing: { count: 0, color: "#3b82f6" },
      Cancelled: { count: 0, color: "#EB5757" },
      Pending: { count: 0, color: "#6b7280" },
    };

    deliveries.forEach((delivery) => {
      if (delivery.delivery_status in statusCounts) {
        statusCounts[delivery.delivery_status].count++;
      }
    });

    return Object.entries(statusCounts).map(([name, data]) => ({
      name,
      count: data.count,
      color: data.color,
    }));
  };

  // Prepare state cards data for food delivery
  const getDynamicCardsData = () => {
    return [
      {
        id: "orders",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#EB5757]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        ),
        title: "Total Orders",
        count: `${orders.length || 0} orders today`,
        buttonText: "View Orders",
        path: "/admin/orders/list",
      },
      {
        id: "staff",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#EB5757]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
        title: "Active Staff",
        count: `${
          staff.filter((member) => member.status === "Active").length || 0
        } staff members online`,
        buttonText: "Manage Staff",
        path: "/admin/staff/list",
      },
      {
        id: "customers",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#EB5757]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ),
        title: "Customers",
        count: `${customers.length || 0} registered customers`,
        buttonText: "View Customers",
        path: "/admin/user/list",
      },
      {
        id: "menu",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#EB5757]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        ),
        title: "Menu Items",
        count: `${
          menuItems.filter((item) => item.status === "Available").length || 0
        } items available`,
        buttonText: "Manage Menu",
        path: "/admin/stock/list",
      },
    ];
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-[#FEE9DE] overflow-hidden">
        <div className="flex-1 overflow-auto pt-16 lg:pt-0">
          <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB5757] mx-auto mb-4"></div>
              <p className="text-lg text-[#333333] font-poppins">
                Loading Fudo dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex h-screen bg-[#FEE9DE] overflow-hidden">
        <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
        <div className="flex-1 overflow-auto pt-16 lg:pt-0">
          <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-[#EB5757] text-5xl mb-4">🍕</div>
              <p className="text-lg text-[#EB5757] mb-4 font-poppins">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#EB5757] text-white rounded-md hover:bg-red-600 font-poppins"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      <Head>
        <title>Fudo Dashboard - Restaurant Admin</title>
        <meta name="description" content="Fudo Food Delivery Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <Sidebar activeItem="dashboard" />

      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Main content with padding adjustment for mobile header and sidebar */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Welcome Section */}
          <div className="mb-8  p-6  font-poppins">
            <h1 className="text-3xl font-bold text-[#333333] font-poppins mb-2">
              Welcome to Fudo Dashboard
            </h1>
            <p className="text-[#666666] font-poppins">
              Manage your restaurant operations, track orders, and monitor performance.
            </p>
          </div>

          {/* StateCard implementation */}
          <div className="mb-6">
            <StateCards cardsData={getDynamicCardsData()} />
          </div>

          {/* Dashboard Overview */}
          <h2 className="text-2xl font-bold text-[#333333] font-poppins mb-4">
            Restaurant Analytics
          </h2>

          {/* Charts Grid - Responsive Layout */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 mb-6 ">
            {/* Order Priority Chart - Takes 1/3 of the space on medium+ screens */}
            <div className="md:col-span-1 bg-[#EB5757]/10 rounded-lg ">
              <DynamicPieChart
                data={getOrderPriorityData()}
                colors={["#EB5757", "#f59e0b", "#10b981"]}
                title="Order Priority Distribution"
                chartType="donut"
                cardWidth="100%"
              />
            </div>

            {/* Delivery Status Chart - Takes 2/3 of the space on medium+ screens */}
            <div className="md:col-span-2 bg-[#EB5757]/10 rounded-lg ">
              <EquipmentStatusChart data={getDeliveryStatusData()} />
            </div>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            {/* Menu Availability Pie Chart */}
            <div className="bg-[#EB5757]/10 rounded-lg font-bold  text-[#333333]">
              <DynamicPieChart
                data={getMenuAvailabilityData()}
                colors={["#4ade80", "#f59e0b", "#EB5757"]}
                title="Menu Item Availability"
                chartType="pie"
                cardWidth="100%"
              />
            </div>

            {/* Notifications and Quick Actions Section */}
            <div>
              <NotificationAndCreateUserCards />
            </div>
          </div>

          {/* Orders Management Table */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[#333333] font-poppins mb-4">
              Recent Orders
            </h3>
          </div>
        </div>
        <div className="px-4 md:px-20 lg:px-16 mb-6">
        <DynamicTable
          data={data}
          title="Order Management"
          columnConfig={{
            id: { hidden: true }, // Hide ID column
            order_code: { title: "Order Code" },
            customerName: { title: "Customer" },
            items: { title: "Items" },
            location: { title: "Delivery Address" },
            driverName: { title: "Driver" },
            priority: { title: "Priority" },
            status: { title: "Status" },
            total: { title: "Total" },
            createdAt: { hidden: true }, // Hide createdAt column
            description: { hidden: true }, // Hide description column
          }}
          addButtonText="Add Order"
            dropdownFields={["priority", "status"]}
            showAcceptAction= {userRole === "Admin"} // Show accept action only for admin
            showRefuseAction= {userRole === "Admin"} // Show reject action only for admin
            showDeleteAction={userRole === "Admin"} // Show delete action only for admin
            onEdit={handleEdit}
            onDelete={confirmDelete} // Changed to open the confirmation modal
            onAddNew={handleAdd} // Added onAddNew prop for adding new orders
            statusField="status"
            reviewingStatus="Preparing"
            // Add the accept and reject functions if the user is an admin
            onAccepte={handleAccept}
            onRefuse={handleReject}
            styled={["status", "priority"]}
        />
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal />
    </div>
  );
};

export default Dashboard;